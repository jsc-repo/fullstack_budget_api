import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useAuthStore = create((set, get) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  removeUser: () => set({ user: null }),
  token: sessionStorage?.getItem("github_key"),
  setToken: (userToken) => set({ token: userToken }),
  removeToken: () => set({ token: null }),
  fetchUser: async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
    };

    const res = await fetch("http://127.0.0.1:8000/auth/user/", requestOptions);
    if (res.ok) {
      const data = await res.json();
      set(() => ({
        user: { ...data },
      }));
      return data;
    } else {
      return null;
    }
  },
  fetchProjects: async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
    };
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/projects/",
        requestOptions
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  },
  fetchExpenses: async (project_id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
    };
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/projects/${project_id}/expenses/`,
        requestOptions
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAuthStore;
