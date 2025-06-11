import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";


const AuthenticatedProfilesComponent: React.FC = () => {
  const [authenticatedProfiles, setAuthenticatedProfiles] = useState([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 10;

  useEffect(() => {
    const fetchAuthenticatedProfiles = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3030/user_auth?_page=${page}&_per_page=${LIMIT}`);
        setAuthenticatedProfiles(data?.data);
        setTotalPages(data?.pages);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err);
          console.error("Axios Error:", err.message);
        } else {
          console.error("Unknown Error:", err);
        }
      }
    };

    fetchAuthenticatedProfiles();
  }, [page]);

  return (
    <div className="h-full w-full flex flex-col flex-1 justify-start items-start  gap-4 text-white py-10 bg-[#111111] ">
      <p className="text-[2.5rem] font-bold mb-2">Authenticated Profiles</p>
      {/*Pagination*/}
      {totalPages > 1 && (
        <div
          className={'w-full flex justify-start items-center py-2 gap-4'}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="flex flex-row justify-center items-center font-semibold gap-1 border border-neutral-700 rounded-lg p-2 text-gray-300 hover:bg-[#222222] hover:text-green-500 hover:border-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <div className="flex flex-row justify-between items-center gap-2 sticky bottom-0">
            <p className="flex flex-row items-center gap-2 text-white text-sm">
              Showing {page} out of {totalPages} pages
            </p>
          </div>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="flex flex-row justify-center items-center font-semibold gap-1 border border-neutral-700 rounded-lg p-2 text-gray-300 hover:bg-[#222222] hover:text-green-500 hover:border-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      )}

      <div className={'flex flex-col w-full gap-2'}>
        {error ? (
          <div className={'border-2 border-white border-opacity-20 bg-[#222222]  rounded-md p-4'}>
            <p className="text-red-500">An error occurred: {error.message}</p>
          </div>
        ) : authenticatedProfiles && authenticatedProfiles.length === 0 ? (
          <div className={'border-2 border-white border-opacity-20 bg-[#222222] rounded-md p-4'}>
            <p className="text-neutral">No Campaigns Found</p>
          </div>
        ) : (authenticatedProfiles.map((profile, idx) => (
          <p key={idx} className="text-neutral">{JSON.stringify(profile)}</p>
        ))
        )}
      </div>
    </div>
  );
}

export default AuthenticatedProfilesComponent;