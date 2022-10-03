import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Notification from "../components/notification/Notification";
import useAuthStore from "../store/authStore";

const BaseLayout = () => {
  const { message, color } = useAuthStore((state) => state.notification);

  return (
    <>
      <Navbar />
      <Notification message={message} color={color} />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};

export default BaseLayout;
