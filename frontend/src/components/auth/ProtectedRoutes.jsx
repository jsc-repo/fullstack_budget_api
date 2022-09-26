import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProtectedRoutes = ({ user, redirectPath = "/categories", children }) => {
  const token = useAuthStore((state) => state.token);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const { isLoading, isError, error, data } = useQuery(["user"], fetchUser);

  if (isLoading) {
    return (
      <div className="alert alert-success shadow-lg">
        <div>
          <span>Your purchase has been confirmed!</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          {console.log(error)}
          <span>Error! Task failed successfully.</span>
        </div>
      </div>
    );
  }

  if (!user && !data) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
