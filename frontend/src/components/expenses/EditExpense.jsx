import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/authStore";

const EditExpense = ({ projectId, expense }) => {
  const queryClient = useQueryClient();
  const editExpense = useAuthStore((state) => state.editExpense);
  const setNotification = useAuthStore((state) => state.setNotification);

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
    setValue,
    formState: { errors },
  } = useForm();

  const amount = expense.amount.replaceAll(",", "");

  const handleEdit = () => {
    setValue("expense_name", expense.expense_name);
    setValue("amount", amount);
    setValue("date_of_expense", expense.date_of_expense);
    setValue("category", expense.category.category_name);
  };

  const { mutate } = useMutation(editExpense, {
    onSuccess: (data) => {
      setNotification({ message: "Expense updated", color: "success" });
      setTimeout(() => {
        setNotification({ message: null, color: null });
      }, 2000);
      reset();
      queryClient.invalidateQueries("expenses");
    },
  });

  const onSubmit = (data) => {
    const requestBody = {
      expenseId: expense.id,
      projectId,
      expense_name: data.expense_name,
      amount: data.amount,
      date_of_expense: data.date_of_expense,
      category: data.category,
    };

    mutate(requestBody);
    document.getElementById(`editExpenseModal-${expense.id}`).checked = false;
  };

  return (
    <>
      <label
        onClick={handleEdit}
        htmlFor={`editExpenseModal-${expense.id}`}
        className="btn modal-btn btn-outline btn-warning btn-xs"
      >
        Edit
      </label>
      <input
        type="checkbox"
        id={`editExpenseModal-${expense.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`editExpenseModal-${expense.id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Edit Expense</h3>
          <form
            className="py-4 flex flex-col w-4/5 mx-auto space-y-2 max-w-xs"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input input-bordered w-full"
              placeholder="expense name"
              {...register("expense_name", {
                required: true,
                maxLength: 50,
              })}
              aria-invalid={errors.expense_name ? "true" : "false"}
            />
            {errors.expense_name?.type === "required" && (
              <p className="text-red-500" role="alert">
                Expense name is required
              </p>
            )}

            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="amount"
              step="0.01"
              {...register("amount", {
                valueAsNumber: true,
                required: true,
                min: 0,
                max: 99999999,
              })}
              aria-invalid={errors.amount ? "true" : "false"}
            />
            {errors.amount?.type === "required" && (
              <p className="text-red-500" role="alert">
                set an expense amount
              </p>
            )}
            {errors.amount?.type === "max" && (
              <p className="text-red-500" role="alert">
                too high
              </p>
            )}

            <input
              className="input input-bordered w-full"
              placeholder="date"
              type="date"
              {...register("date_of_expense", {
                required: true,
                min: 0,
              })}
              aria-invalid={errors.date_of_expense ? "true" : "false"}
            />
            {errors.date_of_expense?.type === "required" && (
              <p className="text-red-500" role="alert">
                please pick the date of the expense
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

            <input className="btn btn-md" type="submit" value="Edit Expense" />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditExpense;
