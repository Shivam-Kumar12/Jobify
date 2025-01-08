import React, { useState, useEffect } from "react";
import CompanyInfo from "../components/CompanyInfo";
import customFetch from "../../../utils/customFetch.js";
import Wrapper from "../assets/wrappers/Job";


const AllCompany = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await customFetch.get("/company/all-company");
        setCompanies(response.data.allcompany);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);


  return (
    <div>
      <h2>All Company</h2>
      {
        companies.map((company) => (
          <CompanyInfo
            key={company._id}
            _id={company._id}
            CompanyName={company.companyName}
            industry={company.industry}
            companyLocation={company.companyLocation}
            dateFounded={company.dateFounded}

          />
        ))
      }
    </div>
  );
};

export default AllCompany;
