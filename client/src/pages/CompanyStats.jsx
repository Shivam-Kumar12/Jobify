import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../../../utils/customFetch";
import { useLoaderData } from "react-router-dom";
export const loader = async ({params}) => {
  try {
    const response = await customFetch.get(`/company-jobs/stats/${params.id}`);
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { pending,interview,declined } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={{pending,interview,declined}} />
    
    </>
  );
};
export default Stats;
