import { useQuery } from "@tanstack/react-query";
import DetailProject from "./DetailProject";
import useAuthStore from "../../store/authStore";

const ListProjects = () => {
  const fetchProjects = useAuthStore((state) => state.fetchProjects);
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["projects"],
    fetchProjects
  );

  return (
    <>
      <div>
        <label htmlFor="createProjectModal" className="btn modal-button">
          Create Project
        </label>
      </div>
      {isLoading && (
        <div className="alert alert-info shadow-lg text-xl text-center">
          <span>Loading</span>
        </div>
      )}
      {isError && (
        <h3 className="text-red-500">
          {error.message ? error.message : error}
        </h3>
      )}
      {!isLoading && !isError && data && !data.length && (
        <div className="text-red-400 p-5 text-2xl text-center">
          No projects to display
        </div>
      )}
      {data && data.length > 0 && <DetailProject projects={data} />}
    </>
  );
};

export default ListProjects;
