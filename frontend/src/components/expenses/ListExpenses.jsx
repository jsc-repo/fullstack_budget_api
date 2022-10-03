import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import DeleteProjectForm from "../projects/DeleteProjectForm";
import CreateExpense from "./CreateExpense";

const ListExpenses = () => {
  const { projectId } = useParams();

  const fetchExpenses = useAuthStore((state) => state.fetchExpenses);
  const { isLoading, isError, error, data } = useQuery(
    ["expenses", projectId],
    () => fetchExpenses(projectId)
  );

  return (
    <>
      <div className="flex justify-between">
        <CreateExpense projectId={projectId} />
        <DeleteProjectForm projectId={projectId} />
      </div>

      {isLoading && <div className="alert alert-success">Loading</div>}

      {data && !isError && data.length > 0 && (
        <div className="overflow-x-auto mt-2">
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
                    <td>${expense.amount}</td>
                    <td>{expense.date_of_expense}</td>
                    <td>
                      {expense.category
                        ? expense.category["category_name"]
                        : ""}
                    </td>
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
