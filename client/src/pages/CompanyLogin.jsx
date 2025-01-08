import { Link, Form, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import { FormRow, Logo, SubmitBtn } from "../components/index.js";
import customFetch from "../../../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    if (data.password.length < 3) {
      throw new Error("Password too short");
    }
    const response = await customFetch.post("/company/login", data);
    const { company } = response.data; // Extract company data
    toast.success("Company login successful");
    return redirect(`/company/${company._id}`); // Redirect to company profile page with company ID
  } catch (error) {
    return { msg: error.response.data.msg || error.message };
  }
};

const CompanyLogin = () => {
  const loginDemoCompany = async () => {
    const data = {
      email: "company@test.com",
      password: "secret123",
    };
    try {
      const response = await customFetch.post("/company/login", data);
      const { company } = response.data; // Extract company data
      toast.success("Company login successful");
      redirect(`/company/${company._id}`); // Redirect to company profile page with company ID
    } catch (error) {
      toast.error(error.response.data.msg || error.message);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Company Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn formBtn />

        <p>
          Not a member yet?{" "}
          <Link to="/company_register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default CompanyLogin;
