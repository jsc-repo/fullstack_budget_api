import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const GitHubLogout = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const removeUser = useAuthStore((state) => state.removeUser);
  const navigate = useNavigate();
  const handleSubmitLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        sessionStorage.removeItem("github_key");
        removeToken();
        removeUser();
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmitLogout}>
      <button className="btn btn-ghost normal-case text-xl" type="submit">
        LOGOUT
      </button>
    </form>
  );
};

export default GitHubLogout;
