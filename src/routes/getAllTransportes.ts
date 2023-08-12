// getAllTransporters.ts
import { Request, Response } from 'express';
import pool from '../dbConfig';
import { Transporter } from '../types/transporterTypes';

export const getAllTransporters = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<Transporter[]>('SELECT * FROM transporters');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transporters', error: error.message });
  }
};
