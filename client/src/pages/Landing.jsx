import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Stay organized and focused on your career goals with our Job
            Tracking App. Effortlessly manage applications, interviews, and
            follow-ups all in one place.
            <span className="quote">
              Efficiency is the cornerstone of success
            </span>
            . With our Job Tracking App, streamline your tasks, monitor
            progress, and elevate productivity seamlessly."
          </p>
          <div className="button">
          <Link to="/register" className="btn register-link">
            Register as User
          </Link>
          <Link to="/company_register" className="btn register-link">
            Register as Company
          </Link>
          <Link to="/login" className="btn login-link">
            Login/Demo User
          </Link>

          <Link to="/company_login" className="btn login-link">
            Login as Company
          </Link>
          </div>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
