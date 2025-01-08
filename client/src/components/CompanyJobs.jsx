import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "../components/JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { toast } from "react-toastify";
day.extend(advancedFormat);


const CompanyJobs = ({
  _id,
  position,
  company,
  companyId,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      
        <header>
          <div className="main-icon">{company.charAt(0)}</div>
          <div className="info">
            <h5>{position}</h5>
            <p>{company}</p>
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
            <JobInfo icon={<FaCalendarAlt />} text={date} />
            <JobInfo icon={<FaBriefcase />} text={jobType} />
            <div className={`status ${jobStatus}`}>{jobStatus}</div>
          </div>
          <footer className="actions">
            <Link
              to={`/${companyId}/edit-companyjob/${_id}`}
              className="btn edit-btn"
            >
              Edit
            </Link>{" "}
            <Form method="post" action={`/${companyId}/delete-companyjob/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
          </footer>
        </div>
    
    </Wrapper>
  );
};

export default CompanyJobs;
