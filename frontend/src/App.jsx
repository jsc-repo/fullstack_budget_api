import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GitHubLogin from "./components/auth/GitHubLogin";
import GitHubLogout from "./components/auth/GitHubLogout";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import ListCategory from "./components/categories/ListCategory";
import ListExpenses from "./components/expenses/ListExpenses";
import CreateProjectForm from "./components/projects/CreateProjectForm";
import ListProjects from "./components/projects/ListProjects";
import BaseLayout from "./pages/BaseLayout";
import Expense from "./pages/Expense";
import Index from "./pages/Index";
import NoMatch from "./pages/NoMatch";
import Project from "./pages/Project";
import useAuthStore from "./store/authStore";

function App() {
  const token = useAuthStore((state) => state.token);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  useEffect(() => {
    fetchUser();
  }, [token]);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <CreateProjectForm />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/github/login" element={<GitHubLogin />} />
          <Route path="/github/logout" element={<GitHubLogout />} />
          <Route path="categories" element={<ListCategory />} />
          <Route element={<ProtectedRoutes user={user} />}>
            <Route path="projects" element={<Project />}>
              <Route path="create" element={<CreateProjectForm />} />
              <Route path=":projectId" element={<ListExpenses />} />
              <Route index element={<ListProjects />} />
            </Route>
            <Route path="expenses/*" element={<Expense />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
