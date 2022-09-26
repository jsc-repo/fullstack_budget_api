import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/authStore";

const GitHubLogin = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const github_code = params.get("code");

  const setToken = useAuthStore((state) => state.setToken);

  async function authGitHub() {
    if (github_code) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: github_code }),
      };

      try {
        const res = await fetch(
          "http://127.0.0.1:8000/auth/github/",
          requestOptions
        );
        if (res.ok) {
          const data = await res.json();
          sessionStorage.setItem("github_key", data.key);
          setToken(data.key);
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
