import React from "react";
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import LocationInfo from "./locationInfo";
import Wrapper from "../assets/wrappers/Job";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
day.extend(advancedFormat);

const CompanyInfo = ({
  _id,
  CompanyName,
  industry,
  companyLocation,
  createdAt,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{CompanyName.charAt(0)}</div>
        <div className="info">
          <h5>{CompanyName}</h5>
          <p>{industry}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <LocationInfo icon={<FaLocationArrow />} text={companyLocation} />
          <LocationInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <footer className="actions">
          <Link to={`../edit-company/${_id}`} className="btn edit-btn">
            Edit
          </Link>{" "}
          <button onClick={() => handleDelete(_id)} className="btn delete-btn">
            Delete
          </button>
        </footer>
      </div>
    </Wrapper>
  );
};

export default CompanyInfo;
