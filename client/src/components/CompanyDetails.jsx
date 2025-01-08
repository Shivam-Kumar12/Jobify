import React, { useState, useEffect } from "react";
import { Form, useParams, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CompanyDetailsWrapper";
import customFetch from "../../../utils/customFetch.js";
import { toast } from "react-toastify";
import AllCompanyJob from "../pages/AllCompanyJob.jsx";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await customFetch.get(`/company/${id}`); // Fetch company details by ID
        setCompany(response.data);
      } catch (error) {
        toast.error(error.response.data.msg || error.message);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  return (
    <Wrapper>
      {company ? (
        <div>
          <header>
            <div className="main-icon">{company.companyName.charAt(0)}</div>
            <div className="info">
              <h2>{company.companyName}</h2>
              <p>Email: {company.email}</p>
              <p>Location: {company.companyLocation}</p>
              <p>Industry: {company.industry}</p>
            </div>
          </header>
          <div className="actions">
            <Link to={`../${id}/add-companyJob`} className="btn add-job-btn">
              Add Job
            </Link>
            <Link to={`/company-jobs/stats/${id}`} className="btn add-job-btn">
              GET STATUS
            </Link>
            
   
          </div>
          <AllCompanyJob _id={id}/>
        </div>

   

      ) : (
        <p>Loading...</p>
      )}
    </Wrapper>
  );
};

export default CompanyDetails;
