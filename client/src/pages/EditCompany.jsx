import React from "react";
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import { useLoaderData, useParams } from "react-router-dom";
import customFetch from "../../../utils/customFetch.js";
import { Form,redirect } from "react-router-dom";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/company/${params.id}`);
    // console.log(data);
    return data;
  } catch (error) {
    // return redirect("/");
    toast.error(error?.response?.data?.msg);
    return redirect("/company/all-company");
  }
};
export const action = async ({ request, params }) => {
  // console.log(request,params)
  
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.patch(`/company/edit-company/${params.id}`, data);
    toast.success("Company edited successfully");
    return redirect("/company/all-company");
     
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    throw error;
  }
};

const EditCompany = (company) => {
  const data = useLoaderData();
  // console.log(job);
  // console.log("joblocation:",data);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h3 className="form-title">Edit Company</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="companyName"
            defaultValue={data.companyName}
            labelText="Company Name"
          />
          <FormRow
            type="text"
            name="industry"
            defaultValue={data.industry}
            labelText="Industry"
          />
          <FormRow
            type="text"
            name="location"
            defaultValue={data.companyLocation}
            labelText="Location"
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditCompany;
