import { FormRow, FormSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
// import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch.js";

export const action = async ({ request }) => {

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
try{
    await customFetch.post("/company/register", data);
    toast.success("Company Registered successfully");
    
    // Redirect to the correct route
    return redirect("/company_login");

  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};


const CompanyRegistrationForm = () => {
  

  return (
    <Wrapper>
    <Form method="post" className="form">
      <h4 className="form-title">Register A Company</h4>
      <div className="form-center">
        <FormRow type="text" name="companyName" labelText="Company Name" required />
        <FormRow type="email" name="email" labelText="Email" required />
        <FormRow type="password" name="password" labelText="Password" required />
        <FormRow type="text" name="companyLocation" labelText="companyLocation" required />
        <FormRow type="text" name="industry" labelText="Industry" />
        <SubmitBtn formBtn />
        <p>
          Already a member?{" "}
          <Link to="/company_login" className="member-btn">
           Login
          </Link>
        </p>
      </div>
    </Form>
  </Wrapper>
  );
};

export default CompanyRegistrationForm;
