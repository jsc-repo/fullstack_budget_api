import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import GitHubLogout from "./auth/GitHubLogout";

const Navbar = () => {
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const profile = useAuthStore((state) => state.profile);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchProfile();
  }, [token]);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Home
          </Link>
        </div>
        <div className="flex-none gap-2">
          {profile ? (
            <>
              <GitHubLogout />
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={profile.avatar_url} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-gray-600 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile">
                      Profile <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/projects">Projects</Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <a
              href="http://127.0.0.1:8000/auth/github/login/"
              className="btn btn-ghost normal-case text-xl"
            >
              GitHub LOGIN
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
