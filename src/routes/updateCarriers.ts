import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { ResultSetHeader } from 'mysql2';

export const updateCarriers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const query = 'UPDATE transporters SET name = ? WHERE id = ?';
    const [result] = await pool.query<ResultSetHeader>(query, [name, id]);
    if (result.changedRows > 0) {
      res.status(200).json({ message: 'Transporter updated successfully' });
    } else {
      res.status(404).json({ error: 'Transporter not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
};
