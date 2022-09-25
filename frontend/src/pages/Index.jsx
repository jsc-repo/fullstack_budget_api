import { useEffect } from "react";
import { useAuthUserQuery } from "../hooks/useAuthUserQuery";

const Index = () => {
  const { data } = useAuthUserQuery();
  console.log("INDEX DATA", data);

  return (
    <div>
      <h1>Index</h1>
    </div>
  );
};

export default Index;
