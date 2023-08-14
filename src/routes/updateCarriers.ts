import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { ResultSetHeader } from 'mysql2';
import { Carriers } from '../types/carriersTypes';

export const updateCarriers = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const updatedData: Partial<Carriers> = req.body;

    const query = 'UPDATE transporters SET ? WHERE id = ?';
    const [result] = await pool.query<ResultSetHeader>(query, [updatedData, id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Carrier updated successfully' });
    } else {
      res.status(404).json({ error: 'Carrier not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
};
