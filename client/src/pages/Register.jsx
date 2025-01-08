import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, Link } from "react-router-dom";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import customFetch from "../../../utils/customFetch.js";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn.jsx";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
        action={(request) => action({ request })}
      >
        <Logo />
        <h4>Register</h4>
        <div className="form-center">
          <FormRow type="text" name="name" labelText="Name" />
          <FormRow type="text" name="lastName" labelText="Last Name" />
          <FormRow type="text" name="location" labelText="Location" />
          <FormRow type="email" name="email" labelText="E-mail" />
          <FormRow type="password" name="password" labelText="Password" />
          <SubmitBtn formBtn />
          <p>
            Already a user?
            <Link to="/login" className="member-btn">
              Login{" "}
            </Link>
          </p>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Register;
