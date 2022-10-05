import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const DeleteProfile = () => {
  const navigate = useNavigate();
  const setNotification = useAuthStore((state) => state.setNotification);
  const deleteProfile = useAuthStore((state) => state.deleteProfile);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteProfile, {
    onSuccess: (data) => {
      sessionStorage.removeItem("github_key");
      queryClient.invalidateQueries(["profile"]);
      setNotification({ message: "ACCOUNT DELETED", color: "error" });
      setTimeout(() => {
        setNotification({ message: null, color: null });
      }, 2500);
      navigate("/");
    },
  });

  const handleSubmit = () => {
    mutate();
    document.getElementById("deleteProfileModal").checked = false;
  };

  return (
    <>
      <label
        htmlFor="deleteProfileModal"
        className="btn btn-outline btn-error modal-button"
      >
        Delete
      </label>

      <input type="checkbox" id="deleteProfileModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="deleteProfileModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-light">
            Are you sure you to{" "}
            <span className="font-bold text-red-800">delete</span> your account?
          </h3>
          <p className="py-4">All your data will be deleted.</p>

          <button
            className="btn bg-red-800"
            type="button"
            onClick={handleSubmit}
          >
            Confirm
          </button>
          <button
            className="btn bg-base-100 ml-3"
            type="button"
            onClick={() => {
              document.getElementById("deleteProfileModal").checked = false;
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteProfile;
