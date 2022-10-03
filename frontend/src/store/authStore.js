import create from "zustand";

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
  createProject: async ({ name, budget }) => {
    console.log(name, budget);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
      body: JSON.stringify({ name, budget }),
    };
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/projects/",
        requestOptions
      );
      if (res.ok) {
        return res.status;
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  },
  deleteProjectById: async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
    };
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/projects/${id}`,
        requestOptions
      );
      if (res.ok) {
        return res.status;
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  },
  createExpense: async ({
    projectId,
    expense_name,
    amount,
    date_of_expense,
    category,
  }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
      body: JSON.stringify({
        project: projectId,
        expense_name,
        amount,
        date_of_expense,
        category,
      }),
    };
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/expenses/",
        requestOptions
      );
      if (res.ok) {
        return res.status;
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAuthStore;
