import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuthStore from "../../store/authStore";
import DeleteProfile from "./DeleteProfile";
import EditProfile from "./EditProfile";

const DetailProfile = () => {
  const fetchProfile = useAuthStore((state) => state.fetchProfile);

  const { isLoading, isSuccess, data, isError } = useQuery(
    ["profile"],
    fetchProfile
  );

  return (
    <>
      {isLoading && (
        <div className="alert alert-info shadow-lg text-xl text-center">
          <span>Loading</span>
        </div>
      )}

      {isSuccess && data && !isError && (
        <div className="bg-base-100 shadow-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col text-center order-last md:order-first">
              <div>
                <p className="font-bold text-xl">Friends</p>
                <p className="">22</p>
              </div>
              <div>
                <p className="font-bold text-xl">Projects</p>
                <p className="">4</p>
              </div>
              <div>
                <p className="font-bold text-xl">Expenses</p>
                <p className="">30</p>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center mx-auto">
                <img
                  className="mask mask-circle"
                  src={data.avatar_url}
                  alt="profile image"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <EditProfile profile={data} />
              <DeleteProfile />

              {/* <button className="btn btn-outline btn-error">Delete</button> */}
            </div>
          </div>

          <div className="text-center mt-8">
            <h1 className="text-4xl font-medium">{data.user}</h1>
            <p className="font-light">
              {data.birth_date ? data.birth_date : "Birthdate 🥳"}
            </p>
            <p>{data.email ? data.email : "no email"}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProfile;
