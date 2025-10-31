import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
  applications = [],
  user = {},
}) => {
  const safeDate = createdAt ? day(createdAt).format("MMM Do, YYYY") : "";
  const safeCompany = "Company";
  const safePosition = position || "Unknown Position";
  const safeJobLocation = jobLocation || "Unknown Location";
  const safeJobType = jobType || "Unknown Type";
  const safeJobStatus = jobStatus || "Unknown Status";

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{safeCompany.charAt(0)}</div>
        <div className="info">
          <h5>{safePosition}</h5>
          <p>{safeCompany}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={safeJobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={safeDate} />
          <JobInfo icon={<FaBriefcase />} text={safeJobType} />
          <div className={`status ${safeJobStatus}`}>{safeJobStatus}</div>
        </div>
        {applications && applications.length > 0 && (
          <div className="applicants">
            <strong>Applicants:</strong>
            <ul>
              {applications.map(applicant => (
                <li key={applicant?._id || applicant?.email || Math.random()}>
                  {applicant?.name || "Unknown"} ({applicant?.email || "No Email"})
                </li>
              ))}
            </ul>
          </div>
        )}
        <footer className="actions">
          {!(user && user.role !== "admin" && jobStatus === "declined") && (
            <Link to={`../edit-job/${_id}`} className="btn edit-btn">Edit</Link>
          )}
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">Delete</button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
