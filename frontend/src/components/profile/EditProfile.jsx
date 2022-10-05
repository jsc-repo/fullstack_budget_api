import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/authStore";

const EditProfile = ({ profile }) => {
  const editProfile = useAuthStore((state) => state.editProfile);
  const queryClient = useQueryClient();
  const setNotification = useAuthStore((state) => state.setNotification);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = () => {
    setValue("birth_date", profile.birth_date);
    setValue("email", profile.email);
  };

  const { mutate } = useMutation(editProfile, {
    onSuccess: (data) => {
      setNotification({ message: "edit success", color: "info" });
      setTimeout(() => {
        setNotification({ message: null, color: null });
      }, 3000);
      queryClient.invalidateQueries(["profile"]);
    },
  });

  const onSubmit = (data) => {
    console.log("edit profile", data);
    const requestBody = {
      birth_date: data.birth_date,
      email: data.email,
    };
    mutate(editProfile(requestBody));
    document.getElementById("editProfileModal").checked = false;
  };

  return (
    <>
      <label
        onClick={handleEdit}
        htmlFor="editProfileModal"
        className="btn modal-btn btn-outline btn-info"
      >
        Edit
      </label>
      <input type="checkbox" id="editProfileModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="editProfileModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Edit Profile</h3>
          <form
            className="py-4 flex flex-col w-4/5 mx-auto space-y-2 max-w-xs"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input input-bordered w-full"
              type="date"
              placeholder="birth date"
              {...register("birth_date", {
                required: true,
              })}
              aria-invalid={errors.birth_date ? "true" : "false"}
            />
            {errors.birth_date?.type === "required" && (
              <p className="text-red-500" role="alert">
                Please enter your birthdate
              </p>
            )}

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="email"
              {...register("email", {
                required: true,
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500" role="alert">
                please enter your email
              </p>
            )}

            <input
              className="btn btn-md btn-primary"
              type="submit"
              value="Edit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
