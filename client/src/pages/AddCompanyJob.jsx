import { FormRow, FormSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { redirect, useOutletContext, Form,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/Constants.js";
import customFetch from "../../../utils/customFetch.js";


export const action = async ({ request,param }) => {
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData.entries());
  console.log("Form Data:", data);

  try {
    await customFetch.post("/company-jobs", data); 
    console.log("data",data);
    toast.success("Company added successfully");
    return redirect(`/company/${data.id}`); 
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddCompanyJob = () => {
const { id } = useParams();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add job</h4>
        <div className="form-center">
          <input type="text" name="id" defaultValue={id} hidden contentEditable="false" />
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" defaultValue={"boat"}  />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            // defaultValue={company?.location || ''} // Use optional chaining
          />
          <FormSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormSelect
            name="jobType"
            labelText="job type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddCompanyJob;
