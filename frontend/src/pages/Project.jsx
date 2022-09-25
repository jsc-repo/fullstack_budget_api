import ListProjects from "../components/projects/ListProjects";
import { useQuery } from "@tanstack/react-query";

const Project = () => {
  const { isLoading, isError, data, error } = useQuery(
    ["projects"],
    fetchProjects
  );

  async function fetchProjects() {
    try {
      const token = sessionStorage.getItem("github_key");
      if (token) {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        };
        const res = await fetch(
          "http://127.0.0.1:8000/api/v1/projects/",
          requestOptions
        );
        if (res.ok) {
          const data = await res.json();
          return data;
        } else {
          console.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isLoading && <h1>Is Loading</h1>}
      {isError && <h3 className="text-red-500">Please Sign In</h3>}
      {!isLoading && !isError && data && !data.length && (
        <span className="text-red-400">You have no projects</span>
      )}
      {data && data.length > 0 && <ListProjects projects={data} />}
    </>
  );
};

export default Project;
