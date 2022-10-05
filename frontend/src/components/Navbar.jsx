import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Logout from "./auth/Logout";

const Navbar = () => {
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const profile = useAuthStore((state) => state.profile);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchProfile();
  }, [token]);
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Home
          </Link>
        </div>
        <div className="flex-none gap-2">
          {profile ? (
            <>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="m-1 btn btn-ghost btn-circle avatar"
                >
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
                  <li>
                    <Logout />
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn m-1">
                Login
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-gray-600 rounded-box w-52"
              >
                <li>
                  <a href="http://127.0.0.1:8000/auth/github/login/">GitHub</a>
                </li>
                <li>
                  <a>Google 2</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
