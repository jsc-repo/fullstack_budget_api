import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GitHubLogin = () => {
  const [accessKey, getAccessKey] = useState("");
  const [params] = useSearchParams();
  const code = params.get("code");

  function postToGitHub() {
    if (code) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ code: code }),
      };
      fetch("http://127.0.0.1:8000/auth/github/", requestOptions)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
  }

  console.log("PARAMS", params);

  useEffect(() => {
    postToGitHub();
  }, []);
  return <></>;
};

export default GitHubLogin;
