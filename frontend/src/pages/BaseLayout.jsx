import { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const BaseLayout = () => {
  return (
    <>
      <Navbar />

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};

export default BaseLayout;
