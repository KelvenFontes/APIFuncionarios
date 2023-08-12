// transporterRoutes.ts
import { Router } from 'express';
import {
  getAllTransporters,
  getTransporterById,
  createTransporter,
  updateTransporter,
  deleteTransporter,
} from '../controllers/transporterController';

const router = Router();

router.get('/transporters', getAllTransporters);
router.get('/transporters/:id', getTransporterById);
router.post('/transporters', createTransporter);
router.put('/transporters/:id', updateTransporter);
router.delete('/transporters/:id', deleteTransporter);

export default router;
