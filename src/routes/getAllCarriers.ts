import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { RowDataPacket } from 'mysql2';

export const getAllCarriers = async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM transporters';
    const [transporters] = await pool.query<RowDataPacket[]>(query);
    if (transporters.length === 0) {
      res.status(404).json({ error: 'No transporters found' });
      console.error('No transporters found');
    } else {
      res.status(200).json(transporters);
      console.log('All transporters retrieved successfully');
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
    console.error('Error retrieving transporters:', error.message);
  }
};
