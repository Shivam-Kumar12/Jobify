import { applyForJob } from '../controllers/jobController.js';
import { authenticateUser } from "../middleware/authMiddleWare.js";
import { Router } from 'express';
const router = Router();
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js';
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from "../middleware/authMiddleWare.js"

// router.get('/',getAllJobs)
// router.post('/',createJob)


router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

// Endpoint for users to apply for a job
router.post('/:id/apply', authenticateUser, applyForJob);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;