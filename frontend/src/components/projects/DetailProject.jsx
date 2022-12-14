import { Link } from "react-router-dom";

const DetailProject = ({ projects }) => {
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4 mt-3 md:grid-cols-2">
        {projects.map((p) => {
          return (
            <div key={p.id}>
              <Link to={`/projects/${p.id}`}>
                <div className="stats stats-vertical lg:stats-horizontal shadow-2xl bg-gray-600">
                  <div className="stat">
                    <div className="stat-title">{p.name}</div>
                    <div className="stat-value">${p.budget}</div>
                    <div className="stat-desc">Expenses: {p.expenses}</div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DetailProject;
