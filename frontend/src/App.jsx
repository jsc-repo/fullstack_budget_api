import { Routes, Route } from "react-router-dom";
import GitHubLogin from "./components/auth/GitHubLogin";
import ListCategory from "./components/categories/ListCategory";
import BaseLayout from "./pages/BaseLayout";
import Index from "./pages/Index";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Index />} />
          <Route path="/github/login/" element={<GitHubLogin />} />
          <Route path="categories" element={<ListCategory />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
