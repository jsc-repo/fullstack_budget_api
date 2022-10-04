import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../store/authStore";

const DeleteExpense = ({ expenseId }) => {
  const queryClient = useQueryClient();
  const deleteExpenseById = useAuthStore((state) => state.deleteExpenseById);
  const setNotification = useAuthStore((state) => state.setNotification);
  const { mutate } = useMutation(deleteExpenseById, {
    onSuccess: (data) => {
      setNotification({ message: "Expense deleted", color: "success" });
      setTimeout(() => {
        setNotification({ message: null, color: null });
      }, 2000);
      queryClient.invalidateQueries("expenses");
    },
  });

  const handleClick = () => {
    mutate(expenseId);
  };
  return (
    <button onClick={handleClick} className="btn btn-outline btn-error btn-xs">
      Delete
    </button>
  );
};

export default DeleteExpense;
