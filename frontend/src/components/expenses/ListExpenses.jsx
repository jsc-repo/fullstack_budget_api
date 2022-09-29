import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ListExpenses = () => {
  const { projectId } = useParams();

  const fetchExpenses = useAuthStore((state) => state.fetchExpenses);
  const { isLoading, isError, error, data } = useQuery(["expenses"], () =>
    fetchExpenses(projectId)
  );

  return (
    <>
      <div>DELETE</div>
      {isLoading && <div className="alert alert-success">Loading</div>}

      {data && !isError && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {data.map((expense) => {
                return (
                  <tr key={expense.id}>
                    <th>{expense.id}</th>
                    <td>{expense.expense_name}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.date_of_expense}</td>
                    <td>{expense.category["category_name"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ListExpenses;
