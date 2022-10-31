import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GitHubLogin from "./components/auth/GitHubLogin";
import Logout from "./components/auth/Logout";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import ListCategory from "./components/categories/ListCategory";
import ListExpenses from "./components/expenses/ListExpenses";
import DetailProfile from "./components/profile/DetailProfile";
import CreateProjectForm from "./components/projects/CreateProjectForm";
import ListProjects from "./components/projects/ListProjects";
import ListStats from "./components/stats/ListStats";
import BaseLayout from "./pages/BaseLayout";
import Expense from "./pages/Expense";
import Index from "./pages/Index";
import NoMatch from "./pages/NoMatch";
import ProfileLayout from "./pages/ProfileLayout";
import Project from "./pages/Project";
import useAuthStore from "./store/authStore";

function App() {
  const fetchProfile = useAuthStore((state) => state.fetchProfile);

  const profile = useAuthStore((state) => state.profile);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <CreateProjectForm />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/github/login" element={<GitHubLogin />} />
          <Route path="/github/logout" element={<Logout />} />
          <Route path="categories" element={<ListCategory />} />
          <Route element={<ProtectedRoutes profile={profile} />}>
            <Route path="profile" element={<ProfileLayout />}>
              <Route index element={<DetailProfile />} />
            </Route>
            <Route path="projects" element={<Project />}>
              <Route path=":projectId" element={<ListExpenses />} />
              <Route path=":projectId/stats" element={<ListStats />} />
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
