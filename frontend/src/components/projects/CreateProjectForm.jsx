import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const CreateProjectForm = () => {
  const createProject = useAuthStore((state) => state.createProject);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(createProject, {
    onSuccess: (data) => {
      console.log("onSuccess", data);
      reset();
      queryClient.invalidateQueries(["projects"]);
      document.getElementById("createProjectModal").checked = false;
      navigate("/projects", { replace: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate({ name: data.name, budget: data.budget });
  };

  return (
    <>
      <input type="checkbox" id="createProjectModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="createProjectModal"
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
              placeholder="budget amount ex: 1234.50"
              type="number"
              {...register("budget", {
                required: true,
                min: 0,
                max: 99999999,
              })}
              aria-invalid={errors.budget ? "true" : "false"}
            />
            {errors.budget?.type === "required" && (
              <p className="text-red-500" role="alert">
                Set a budget
              </p>
            )}
            {errors.budget?.type === "max" && (
              <p className="text-red-500" role="alert">
                over budget
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
