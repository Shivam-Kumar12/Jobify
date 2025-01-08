import CompanyJob from '../Models/companyJobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from "dayjs"

// Get all company jobs
export const getAllCompanyJobs = async (req, res) => {
  try {
    const companyJobs = await CompanyJob.find();
    res.status(StatusCodes.OK).json({ companyJobs });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Create a new company job
export const createCompanyJob = async (req, res) => {
  try {
    const { company, position, jobStatus, jobType, jobLocation } = req.body;
    // console.log(company, position, jobStatus, jobType, jobLocation);
    const createdBy = req.user.userId; // Assuming you have user authentication
    const newCompanyJob = await CompanyJob.create({ company, position, jobStatus, jobType, jobLocation, createdBy });
    res.status(StatusCodes.CREATED).json({ companyJob: newCompanyJob });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Get a specific company job by ID
export const getCompanyJob = async (req, res) => {
  try {
    const { id } = req.params;
    const companyJob = await CompanyJob.find({createdBy:id});
    // console.log(companyJob);
    if (!companyJob) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company job not found' });
    }
    res.status(StatusCodes.OK).json({ companyJob });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Update a company job
export const updateCompanyJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // console.log(id, updates);
    const updatedCompanyJob = await CompanyJob.findByIdAndUpdate(id, updates, { new: true });
    // console.log(updateCompanyJob);
    if (!updatedCompanyJob) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company job not found' });
    }
    res.status(StatusCodes.OK).json({ companyJob: updatedCompanyJob });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    // console.log("Fetching company job by ID:", jobId);
    
    const job = await CompanyJob.findById(jobId);
    if (!job) {
      // console.log("Company job not found for ID:", jobId);
      return res.status(404).json({ msg: "Company job not found" });
    }
    // console.log("Company job found:", job);
    res.json(job);
  } catch (error) {
    console.error("Error fetching company job by ID:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


// Delete a company job
export const deleteCompanyJob = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting company job with ID:", id); // Log the ID being deleted
    const deletedCompanyJob = await CompanyJob.findByIdAndDelete(id);
    if (!deletedCompanyJob) {
      console.log("Company job not found"); // Log if the company job was not found
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Company job not found' });
    }
    console.log("Company job deleted successfully"); // Log if the company job was deleted successfully
    res.status(StatusCodes.OK).json({ message: 'Company job deleted successfully' });
  } catch (error) {
    console.error("Error deleting company job:", error.message); // Log any errors that occur during deletion
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};


//


export const showCompanyJobStats= async(req,res)=>{
  const { id } = req.params;
  // const id="6632123def6c6ab9f7ba9a7b"
  // console.log(id)
  
  

const pending=await CompanyJob.find({createdBy:id,jobStatus:"pending"});
const interview=await CompanyJob.find({createdBy:id,jobStatus:"interview"});
const declined=await CompanyJob.find({createdBy:id,jobStatus:"declined"});

res.status(StatusCodes.OK).json({pending:pending.length,interview:interview.length,declined:declined.length})

}