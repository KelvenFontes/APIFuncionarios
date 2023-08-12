import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import transporterRoutes from './routes/transporterRoutes';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { requestResponseLogger } from './middlewares/requestResponseLogger';
import { errorHandler } from './middlewares/errorHandler'; // Importe o middleware errorHandler

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
app.use(loggerMiddleware); // Use o middleware de logger
app.use(requestResponseLogger); // Use o middleware de logging de solicitações e respostas

app.use('/api', transporterRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
