import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../store/authStore";
import { useParams } from "react-router-dom";

const ListStats = () => {
  const { projectId } = useParams();
  const fetchStats = useAuthStore((state) => state.fetchStats);
  const { isLoading, isError, isSuccess, Success, data } = useQuery(
    ["stats", projectId],
    () => fetchStats(projectId)
  );

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Expense By Category",
      },
      legend: {
        display: false,
      },
    },
  };

  const chartData = {
    labels: isSuccess && data.category_labels,
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "USD",
        data: isSuccess && data.category_data,
        // you can set indiviual colors for each bar
        backgroundColor: [
          "#25316D",
          "#367E18",
          "#97D2EC",
          "#7FB77E",
          "#B1B2FF",
          "#FFC4C4",
          "#FECD70",
          "#FAD9E6",
          "#5F6F94",
          "#EA5C2B",
          "#125C13",
          "#3F72AF",
          "#AA96DA",
          "#FF2E63",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="container">
        {isLoading && <div className="alert alert-success">Loading</div>}
        {isSuccess && !isError && (
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Total</div>
              <div className="stat-value">${data.expenses_sum}</div>
              <div className="stat-desc">From January 1st to February 1st</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Highest Expense</div>
              <div className="stat-value">${data.expenses_max}</div>
              <div className="stat-desc">From January 1st to February 1st</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Lowest Expense</div>
              <div className="stat-value text-secondary">
                ${data.expenses_min}
              </div>
              <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Average Expense</div>
              <div className="stat-value">${data.expenses_avg}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        )}
        <div className="divider"></div>
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
};

export default ListStats;
