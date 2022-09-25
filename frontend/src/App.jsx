import { Routes, Route } from "react-router-dom";
import GitHubLogin from "./components/auth/GitHubLogin";
import GitHubLogout from "./components/auth/GitHubLogout";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import ListCategory from "./components/categories/ListCategory";
import { useAuthUserQuery } from "./hooks/useAuthUserQuery";
import BaseLayout from "./pages/BaseLayout";
import Index from "./pages/Index";
import NoMatch from "./pages/NoMatch";
import Project from "./pages/Project";

function App() {
  const { data } = useAuthUserQuery();

  return (
    <>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/github/login" element={<GitHubLogin />} />
          <Route path="/github/login" element={<GitHubLogin />} />
          <Route path="/github/logout" element={<GitHubLogout />} />
          <Route path="categories" element={<ListCategory />} />
          <Route element={<ProtectedRoutes user={data} />}>
            <Route path="projects" element={<Project />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
