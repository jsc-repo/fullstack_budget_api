import { Link } from "react-router-dom";

const DetailProject = ({ projects }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-32">
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
