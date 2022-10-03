import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const DeleteProjectForm = ({ projectId }) => {
  const deleteProjectById = useAuthStore((state) => state.deleteProjectById);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setNotification = useAuthStore((state) => state.setNotification);

  const { mutate } = useMutation(deleteProjectById, {
    onSuccess: (data) => {
      console.log(data);
      setNotification({ message: "Project Deleted", color: "error" });
      setTimeout(() => {
        setNotification({ message: null, color: null });
      }, 2000);
      queryClient.invalidateQueries(["projects"]);
      navigate("/projects", { replace: true });
    },
  });

  const handleSubmit = () => {
    mutate(projectId);
  };

  return (
    <>
      <label
        htmlFor="deleteProjectModal"
        className="btn btn-outline btn-error modal-button"
      >
        Delete Project
      </label>
      <input type="checkbox" id="deleteProjectModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-sm flex flex-col">
          <label
            htmlFor="deleteProjectModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="mx-auto">
            <h3 className="text-2xl font-bold">Delete project?</h3>
            <button
              role="button"
              className="btn btn-error btn-md w-32 justify-center"
              onClick={handleSubmit}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteProjectForm;
