import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { Carriers } from '../types/carriersTypes';
import { RowDataPacket } from 'mysql2';

export const getCarriersByCNPJ = async (req: Request, res: Response) => {
  try {
    const { CNPJ } = req.params;
    const query = 'SELECT * FROM transporters WHERE CNPJ = ?';
    const [transporters] = await pool.query<RowDataPacket[]>(query, [CNPJ]);

    if (transporters.length === 0) {
      res.status(404).json({ error: 'Carrier not found' });
    } else {
      const transporter = transporters[0] as Carriers;
      res.status(200).json({ transporter, message: `Carrier successfully found for the cnpj: ${CNPJ}` });
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
};
