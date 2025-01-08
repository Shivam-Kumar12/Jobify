import Company from '../Models/CompanyModels.js';
import Job from "../Models/jobModels.js";
import bcrypt from 'bcryptjs';
import { createJWT } from "../utils/tokenUtils.js";


export const registerCompany = async (req, res) => {
    try {
        const { companyName, email, password, companyLocation, industry } = req.body;
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCompany = new Company({ companyName, email, password: hashedPassword, companyLocation, industry });
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        console.error("Error registering company:", error);
        res.status(500).json({ message: error.message });
    }
};
export const loginCompany = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the company by email
        const company = await Company.findOne({ email });
        if (!company) {
            console.log("Company not found");
            return res.status(404).json({ message: "Company not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, company.password);
        if (!isPasswordValid) {
            console.log("Invalid credentials");
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = createJWT({ userId: company._id });
        const oneDay = 1000 * 60 * 60 * 24;
       res.cookie('token', token, {
         httpOnly: true,
         expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
  })
        // console.log("Login successful for company:", company);
        res.status(200).json({ message: "Login successful", company });
    } catch (error) {
        console.error("Error logging in company:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        // console.log(req.params.companyId);
        const company = await Company.findById(companyId);
        if (!company) {
            console.log("Company not found for ID:", companyId);
            return res.status(404).json({ msg: "Company not found" });
        }
        // console.log("Company found:", company);
        res.json(company);
    } catch (error) {
        console.error("Error fetching company by ID:", error);
        res.status(500).json({ msg: "Server error" });
    }
};
  
export const getallCompany = async (req, res) => {
    try {
        const allcompany = await Company.find()
        res.status(201).json({ allcompany })

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
export const editCompanyProfile = async (req, res) => {
    try {
        const { companyName, email, companyLocation, industry } = req.body;
        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            { companyName, email, companyLocation, industry },
            { new: true }
        );

        if (!updatedCompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.status(200).json(updatedCompany);
    } catch (error) {
        console.error("Error editing company profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, companyId } = req.body;
        const newJob = new Job({ title, description, requirements, companyId });
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
