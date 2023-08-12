import { Router } from 'express';
import { createCarriers } from './routes/createCarriers';
import { deleteCarriers } from './routes/deleteCarriers';
import { getAllCarriers } from './routes/getAllCarriers';
import { getCarriersById } from './routes/getCarriersById';
import { updateCarriers } from './routes/updateCarriers';

const router = Router();

router.get('/transporters', getAllCarriers);
router.get('/transporters/:id', getCarriersById);
router.post('/transporters', createCarriers);
router.put('/transporters/:id', updateCarriers);
router.delete('/transporters/:id', deleteCarriers);

export default router;
