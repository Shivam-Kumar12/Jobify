import { Router } from 'express';
const router = Router();
import {
  getAllCompanyJobs,
  getCompanyJob,
  createCompanyJob,
  updateCompanyJob,
  getJobById,
  deleteCompanyJob,
  showCompanyJobStats,
} from '../controllers/CompanyJobController.js';
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { authenticateUser, checkForTestUser } from "../middleware/authMiddleWare.js"

router
  .route('/')
  .get(getAllCompanyJobs)
  .post(validateJobInput, authenticateUser, createCompanyJob);
router.route('/stats/:id').get(showCompanyJobStats);
router.route("/job/:id").get(getJobById);


router
  .route('/:id')
  .get(getCompanyJob)
  .patch(validateJobInput, updateCompanyJob)
  .delete(deleteCompanyJob);

export default router;
