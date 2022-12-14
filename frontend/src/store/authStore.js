import create from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  setUser: (userData) => set({ user: userData }),
  removeUser: () => set({ user: null }),
  notification: { message: null, color: null },
  setNotification: ({ message, color }) => {
    set({ notification: { message, color } });
  },
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
        return data.results;
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  },
  fetchExpenses: async (project_id, page = 1) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
    };
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/projects/${project_id}/expenses/?page=${page}`,
        requestOptions
      );
      // const res = await fetch(pageUrl, requestOptions);
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
        console.error(res.status);
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
        return res.status;
      }
    } catch (error) {
      console.error(error);
    }
  },
  deleteExpenseById: async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
    };
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/expenses/${id}`,
        requestOptions
      );
      if (res.ok) {
        return res.status;
      } else {
        console.error(res.status);
      }
    } catch (error) {
      console.error(error);
    }
  },
  editExpense: async ({
    projectId,
    expenseId,
    expense_name,
    amount,
    date_of_expense,
    category,
  }) => {
    const requestOptions = {
      method: "PUT",
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
        `http://127.0.0.1:8000/api/v1/expenses/${expenseId}/`,
        requestOptions
      );
      if (res.ok) {
        return res.status;
      } else {
        console.error(res.status);
      }
    } catch (error) {
      console.error(error);
    }
  },
  fetchProfile: async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
    };
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/profile/`,
        requestOptions
      );
      if (res.ok) {
        const data = await res.json();
        set(() => ({
          profile: { ...data },
        }));
        return data;
      } else {
        console.error(res.error);
        // return null;
      }
    } catch (error) {
      console.error(error);
    }
  },
  editProfile: async ({ birth_date, email }) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
      body: JSON.stringify({
        birth_date,
        email,
      }),
    };
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/profile/",
        requestOptions
      );
      if (res.ok) {
        const data = await res.json();
        set(() => ({
          profile: { ...data },
        }));
        return res.status;
      } else {
        console.error(res.status);
      }
    } catch (error) {
      console.error(error);
    }
  },
  deleteProfile: async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
    };
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/profile/`,
        requestOptions
      );
      if (res.ok) {
        set(() => ({
          profile: null,
        }));
        get().removeToken();
        return res.status;
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  },
  fetchStats: async (project_id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().token}`,
      },
    };
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/projects/${project_id}/stats`,
        requestOptions
      );
      // const res = await fetch(pageUrl, requestOptions);
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
