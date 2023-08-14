import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { ResultSetHeader } from 'mysql2';

export const deleteCarriers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM transporters WHERE id = ?';
    const [result] = await pool.query<ResultSetHeader>(query, [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Carrier deleted successfully' });
    } else {
      res.status(404).json({ error: 'Carrier not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
};
