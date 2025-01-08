import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch.js";
import { redirect } from "react-router-dom";


export const action=async({ params })=>{

  try {
    await customFetch.delete(`/company-jobs/${params.id}`)
    toast.success('Job deleted Succesfully')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect(`/company/${params.companyId}`)
  // return redirect(`/company/${params.companyId}`);
}

