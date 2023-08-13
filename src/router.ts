import { Router } from 'express';
import { createCarriers } from './routes/createCarriers';
import { deleteCarriers } from './routes/deleteCarriers';
import { getAllCarriers } from './routes/getAllCarriers';
import { getCarriersById } from './routes/getCarriersById';
import { getCarriersByCNPJ } from './routes/getCarriersByCNPJ';
import { updateCarriers } from './routes/updateCarriers';

const router = Router();

router.get('/Carriers', getAllCarriers);
router.get('/Carriers/:id', getCarriersById);
router.get('/Carriers/company/:CNPJ', getCarriersByCNPJ);
router.post('/Carriers', createCarriers);
router.put('/Carriers/:id', updateCarriers);
router.delete('/Carriers/:id', deleteCarriers);

export default router;
