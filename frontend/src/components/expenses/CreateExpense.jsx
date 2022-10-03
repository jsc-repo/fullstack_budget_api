import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const CreateExpense = ({ projectId }) => {
  const createExpense = useAuthStore((state) => state.createExpense);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/v1/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(createExpense, {
    onSuccess: (data) => {
      reset();
      document.getElementById("addExpenseModal").checked = false;
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const onSubmit = (data) => {
    const expenseFormData = { ...data, projectId };
    console.log(expenseFormData);
    mutate(expenseFormData);
  };

  const handleModal = () => {
    document.getElementById("addExpenseModal").checked = false;
  };

  return (
    <>
      <label htmlFor="addExpenseModal" className="btn modal-button">
        Add Expense
      </label>
      <input type="checkbox" id="addExpenseModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="addExpenseModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Create Expense</h3>
          <form
            className="py-4 flex flex-col w-4/5 mx-auto space-y-2 max-w-xs"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input input-bordered w-full"
              placeholder="expense name"
              {...register("expense_name", { required: true, maxLength: 50 })}
              aria-invalid={errors.expense_name ? "true" : "false"}
            />
            {errors.expense_name?.type === "required" && (
              <p className="text-red-500" role="alert">
                Expense name is required
              </p>
            )}
            <input
              className="input input-bordered w-full"
              placeholder="amount"
              type="number"
              {...register("amount", {
                required: true,
                min: 0,
                max: 99999999,
              })}
              aria-invalid={errors.amount ? "true" : "false"}
            />
            {errors.amount?.type === "required" && (
              <p className="text-red-500" role="alert">
                Set an expense amount
              </p>
            )}
            {errors.amount?.type === "amount" && (
              <p className="text-red-500" role="alert">
                too high
              </p>
            )}
            <input
              className="input input-bordered w-full"
              placeholder="date"
              type="date"
              {...register("date_of_expense", { required: true, min: 0 })}
              aria-invalid={errors.date_of_expense ? "true" : "false"}
            />
            {errors.date_of_expense?.type === "required" && (
              <p className="text-red-500" role="alert">
                Set a budget
              </p>
            )}
            <select
              className="select select-bordered"
              {...register("category", { required: true })}
              aria-invalid={errors.category ? "true" : "false"}
            >
              {categories.map((catObj) => (
                <option key={catObj.id} value={catObj.category_name}>
                  {catObj.category_name}
                </option>
              ))}
            </select>
            {errors.category?.type === "required" && (
              <p className="text-red-500" role="alert">
                Please pick a category
              </p>
            )}

            <input className="btn btn-md" type="submit" value="Add Expense" />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateExpense;
