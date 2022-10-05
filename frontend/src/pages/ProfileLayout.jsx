import React from "react";
import { Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProfileLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProfileLayout;
