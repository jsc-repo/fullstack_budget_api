import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const CreateProjectForm = () => {
  const createProject = useAuthStore((state) => state.createProject);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createProject(data.name, data.budget);
    reset();
    document.getElementById("my-modal-3").checked = false;

    navigate("projects");
  };

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form
            className="py-4 flex flex-col w-4/5 mx-auto space-y-2 max-w-xs"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input input-bordered w-full"
              placeholder="Project name"
              {...register("name", { required: true, maxLength: 50 })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500" role="alert">
                Project name is required
              </p>
            )}
            <input
              className="input input-bordered w-full"
              placeholder="budget"
              type="number"
              {...register("budget", { required: true, min: 0 })}
              aria-invalid={errors.budget ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500" role="alert">
                Set a budget
              </p>
            )}
            <input className="btn btn-md" type="submit" value="Create" />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProjectForm;
