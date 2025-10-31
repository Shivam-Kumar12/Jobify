import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../../../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

const AllJobsContext = createContext();

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries()
    ]);
    const { data } = await customFetch.get("/jobs", {
      params,
    });
    return {
      data,
      searchValues: { ...params },
      error: null,
    };
  } catch (error) {
    // Show actual error message in UI
    return {
      data: { jobs: [], totalJobs: 0, numOfPages: 1 },
      searchValues: {},
      error: error?.response?.data?.msg || "Something went wrong",
    };
  }
};

const AllJobs = () => {
  const { data, searchValues, error } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      {error ? (
        <div style={{ color: 'red', textAlign: 'center', margin: '2rem' }}>
          <h2>Error: {error}</h2>
        </div>
      ) : (
        <JobsContainer />
      )}
    </AllJobsContext.Provider>
  );
};

export default AllJobs;

export const useAllJobsContext = () => useContext(AllJobsContext);
