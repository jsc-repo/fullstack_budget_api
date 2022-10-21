import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import DeleteProjectForm from "../projects/DeleteProjectForm";
import CreateExpense from "./CreateExpense";
import DeleteExpense from "./DeleteExpense";
import EditExpense from "./EditExpense";

const ListExpenses = () => {
  const { projectId } = useParams();
  const [filters, setFilters] = useState("");
  const [query, setSearchQuery] = useSearchParams({ page: 1 });
  const page = parseInt(query.get("page"));

  const fetchExpenses = useAuthStore((state) => state.fetchExpenses);
  const { isLoading, isError, error, data, isPreviousData, isSuccess } =
    useQuery(
      ["expenses", projectId, page],
      () => fetchExpenses(projectId, page),
      {
        keepPreviousData: true,
      }
    );

  return (
    <>
      {isLoading && <div className="alert alert-success">Loading</div>}

      <div className="flex justify-between">
        <CreateExpense projectId={projectId} />
        <input
          type="text"
          placeholder="Search for an expense"
          className="input input-bordered w-full max-w-xs"
          value={filters}
          onChange={(e) => setFilters(e.target.value)}
        />
        <DeleteProjectForm projectId={projectId} />
      </div>

      {isSuccess && data.results.length > 0 && (
        <>
          <div className="overflow-x-auto mt-2">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.results
                  .filter((expense) => expense.expense_name.includes(filters))
                  ?.map((expense) => {
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
                        <td className="space-x-2">
                          <DeleteExpense expenseId={expense.id} />
                          <EditExpense
                            projectId={projectId}
                            expense={expense}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="btn-group flex justify-center">
            {data?.previous && (
              <button
                onClick={() => {
                  setSearchQuery({ page: 1 });
                }}
                className="btn btn-primary"
              >
                First
              </button>
            )}

            {data?.previous && (
              <button
                className="btn btn-info"
                onClick={() => {
                  setSearchQuery({ page: page - 1 });
                }}
              >
                Prev
              </button>
            )}

            <button className="btn btn-disabled text-white">{page}</button>

            <button
              className="btn btn-accent"
              onClick={() => {
                if (!isPreviousData && data?.next) {
                  setSearchQuery({ page: page + 1 });
                }
              }}
              disabled={isPreviousData || !data?.next}
            >
              Next
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (data?.next) {
                  setSearchQuery({ page: Math.ceil(data?.count / 15) });
                }
              }}
              disabled={isPreviousData || !data?.next}
            >
              Last
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ListExpenses;
