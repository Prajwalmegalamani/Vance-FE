import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import usersApi from "../api/users";
import UserCard from "./UserCardComponent";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const UsersComponent: React.FC = () => {
  const initialRender = useRef(true);
  /* 
  TODO 4: instead of dealing with users, error, etc as separate states, is there a better and more reusable way to handle general api calls?
  basic requirements should be, you should be able to handle data, error state and loading state
  once this is done, lets introduce loading state here as well

  - DONE
  */

  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["users", page],
    queryFn: () => usersApi().getUsers({ page, pageSize: LIMIT }),
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error, isPending, data]);

  /*
  TODO 6: this should be logged only when user data has seen a change, not on first render

  - DONE
  */
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      console.log("Users data updated");
    }
  }, [data]);

  // useEffect(() => {
  //   if (data && data.data.length > 0) {
  //     console.log("Users data updated");
  //   }
  // }, [data]);

  const getLoadingComponent = () => {
    return (
      <div className={"border bg-black-500 rounded-md border-white-500 p-4"}>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  };

  const getErrorComponent = (error: any) => {
    return (
      <div className={"border bg-black-500 rounded-md border-white-500 p-4"}>
        <p className="text-red-500">An error occurred: {error.message}</p>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col flex-1 justify-start items-start  gap-4 text-white py-10 bg-[#111111] ">
      <p className="text-[2.5rem] font-bold mb-2">Users</p>

      {data?.total_pages > 1 && (
        <div className={"w-full flex justify-start items-center py-2 gap-4"}>
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="flex flex-row justify-center items-center font-semibold gap-1 border border-neutral-700 rounded-lg p-2 text-gray-300 hover:bg-[#222222] hover:text-green-500 hover:border-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <div className="flex flex-row justify-between items-center gap-2 sticky bottom-0">
            <p className="flex flex-row items-center gap-2 text-white text-sm">
              Showing {page} out of {data?.total_pages} pages
            </p>
          </div>
          <button
            disabled={page === data?.total_pages}
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, data?.total_pages))
            }
            className="flex flex-row justify-center items-center font-semibold gap-1 border border-neutral-700 rounded-lg p-2 text-gray-300 hover:bg-[#222222] hover:text-green-500 hover:border-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      )}
      <div className={"flex flex-col gap-2"}>
        {isPending ? (
          getLoadingComponent()
        ) : error ? (
          getErrorComponent(error)
        ) : !data || data.data.length === 0 ? (
          <div
            className={
              "border-2 border-white border-opacity-20 bg-black-500 rounded-md p-4"
            }
          >
            <p className="text-neutral">No User Found</p>
          </div>
        ) : (
          data.data.map((user: any, idx: number) => (
            <UserCard key={idx} user={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default UsersComponent;
