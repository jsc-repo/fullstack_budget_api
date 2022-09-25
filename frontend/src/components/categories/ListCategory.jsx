import { useQuery } from "@tanstack/react-query";

const ListCategory = () => {
  const { isLoading, isError, data, error } = useQuery(
    ["categories"],
    fetchCategories
  );

  async function fetchCategories() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/categories");
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.error(error.message);
    }
    // return fetch("http://localhost:8000/api/v1/categories")
    //   .then((res) => res.json())
    //   .then(({ success, data }) => {
    //     if (!success) {
    //       throw new Error("Bad Request");
    //     }
    //     console.log(data);
    //     return data;
    //   });
  }

  return (
    <div>
      <h1>Categories</h1>
      {isLoading && <p>Loading</p>}
      {isError && <p>{error.message ? error.message : error}</p>}
      {data &&
        data.map((category, index) => {
          return <p key={index}>{category.category_name}</p>;
        })}
    </div>
  );
};

export default ListCategory;
