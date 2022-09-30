import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const DeleteProjectForm = ({ projectId }) => {
  const deleteProjectById = useAuthStore((state) => state.deleteProjectById);
  const navigate = useNavigate();

  const handleSubmit = () => {
    deleteProjectById(projectId);
    document.getElementById("deleteProjectModal").checked = false;

    navigate("/projects");
  };

  return (
    <>
      <input type="checkbox" id="deleteProjectModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="deleteProjectModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Delete project?</h3>
          <button
            role="button"
            className="btn btn-error btn-sm"
            onClick={handleSubmit}
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteProjectForm;
