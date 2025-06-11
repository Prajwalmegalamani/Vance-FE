import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const campaignsApi = () => {
  return {
    getCampaigns: async ({
      page,
      pageSize,
    }: {
      page: number;
      pageSize: number;
    }) => {
      const response = await axios.get(
        `http://localhost:3030/campaigns?_page=${page}&_per_page=${pageSize}`
      );
      return response.data;
    },
  };
};

const CampaignsComponent: React.FC = () => {
  const [page, setPage] = useState(1);

  const LIMIT = 10;

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["campaigns", page],
    queryFn: () => campaignsApi().getCampaigns({ page, pageSize: LIMIT }),
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
    console.log("🚀 ~ data:", data);
  }, [isError, error, isPending, data]);

  return (
    <div className="h-full w-full flex flex-col flex-1 justify-start items-start  gap-4 text-white py-10 bg-[#111111] ">
      <p className="text-[2.5rem] font-bold mb-2">Campaigns</p>
      {/*Pagination*/}
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

      <div className={"flex flex-col w-full gap-2"}>
        {isPending ? (
          <div
            className={"border bg-black-500 rounded-md border-white-500 p-4"}
          >
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <div
            className={
              "border-2 border-white border-opacity-20 bg-[#222222]  rounded-md p-4"
            }
          >
            <p className="text-red-500">An error occurred: {error.message}</p>
          </div>
        ) : data && data.data.length === 0 ? (
          <div
            className={
              "border-2 border-white border-opacity-20 bg-[#222222] rounded-md p-4"
            }
          >
            <p className="text-neutral">No Campaigns Found</p>
          </div>
        ) : (
          data.data.map((campaign: any, idx: number) => (
            <p key={idx} className="text-neutral">
              {JSON.stringify(campaign)}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignsComponent;
