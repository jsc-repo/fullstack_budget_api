import { Link } from "react-router-dom";
import { useAuthUserQuery } from "../hooks/useAuthUserQuery";
import GitHubLogout from "./auth/GitHubLogout";

const Navbar = () => {
  const { data } = useAuthUserQuery();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Home
        </Link>
      </div>
      <div className="flex-none gap-2">
        {data ? (
          <>
            <GitHubLogout />
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
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
  );
};

export default Navbar;
