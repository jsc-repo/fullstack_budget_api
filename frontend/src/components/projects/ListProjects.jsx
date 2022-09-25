const ListProjects = ({ projects }) => {
  return (
    <>
      {projects.map((p) => {
        return (
          <div
            key={p.id}
            className="stats stats-vertical lg:stats-horizontal shadow-2xl bg-gray-500"
          >
            <div className="stat">
              <div className="stat-title">{p.name}</div>
              <div className="stat-value">${p.budget}</div>
              <div className="stat-desc">Expenses: {p.expenses}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListProjects;
