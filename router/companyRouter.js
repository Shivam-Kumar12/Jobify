import express from 'express';
const router = express.Router();
import { validateRegisterInput,validateLoginInput } from "../middleware/validationMiddleware.js";

import { registerCompany, loginCompany, editCompanyProfile, getCompanyById, postJob, getallCompany } from '../controllers/CompanyController.js';

router.route("/register").post(registerCompany,validateRegisterInput);
router.route("/login").post(loginCompany,validateLoginInput);
router.route("/all-company").get(getallCompany);
router.route("/:companyId").get(getCompanyById); // Endpoint to fetch company by ID

router.route("/edit-company/:id").patch(editCompanyProfile);
router.route("/jobs").post(postJob);



export default router;
