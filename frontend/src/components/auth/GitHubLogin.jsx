import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GitHubLogin = () => {
  const navigate = useNavigate();
  const [accessKey, getAccessKey] = useState("");
  const [params] = useSearchParams();
  console.log("PARAMS", params);
  const code = params.get("code");

  async function authGitHub() {
    if (code) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      };

      try {
        const res = await fetch(
          "http://127.0.0.1:8000/auth/github/",
          requestOptions
        );
        if (res.ok) {
          const data = await res.json();
          sessionStorage.setItem("github_key", data.key);
          navigate("/");
        } else {
          console.error(res.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    authGitHub();
  }, []);
  return <></>;
};

export default GitHubLogin;
