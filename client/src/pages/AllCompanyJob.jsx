import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import customFetch from "../../../utils/customFetch.js";
import { toast } from "react-toastify";
import CompanyJobs from "../components/CompanyJobs.jsx";

const AllCompanyJob = () => {
  const { id } = useParams();
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        // console.log("Fetching company details for ID:", id);
        const response = await customFetch.get(`company-jobs/${id}`);
        setCompany(response.data.companyJob);
        // console.log("Fetched company details:", response.data.companyJob);
      } catch (error) {
        console.error("Error fetching company details:", error);
        toast.error(error.response.data.msg || error.message);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  // console.log("Company jobs to render:", company);

  return (
    <div>
      {company.length > 0 &&
        company.map((i) => (
          <CompanyJobs
            key={i._id}
            _id={i._id}
            companyId={id}
            position={i.position}
            company={i.company}
            jobLocation={i.jobLocation}
            jobType={i.jobType}
            createdAt={i.createdAt}
            jobStatus={i.jobStatus}
          />
        ))}
    </div>
  );
};

export default AllCompanyJob;
