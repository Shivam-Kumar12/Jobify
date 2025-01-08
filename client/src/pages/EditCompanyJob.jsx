import React from "react";
import { FormRow, SubmitBtn, FormSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/Constants.js";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch.js";
import { Form, redirect, useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  console.log(params);
  try {
    const { data } = await customFetch.get(`/company-jobs/job/${params.id}`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);


  try {
    await customFetch.patch(`/company-jobs/${params.id}`, data);
    toast.success("Company job edited successfully");
    return redirect(`/company/${params.companyId}`);
     // Redirect URL as per your application logic
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    throw error;
  }
};

const EditCompanyJob = () => {
  const data = useLoaderData();
  // console.log("Loader Data:", data);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h3 className="form-title">Edit Company Job</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={data.position}
            labelText="Position"
          />
          <FormRow
            type="text"
            name="company"
            defaultValue={data.company}
            labelText="Company"
          />
          <FormRow
            type="text"
            name="jobLocation"
            defaultValue={data.jobLocation}
            labelText="Job Location"
          />

          <FormSelect
            labelText="Job Status"
            name="jobStatus"
            defaultValue={data.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={data.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditCompanyJob;
