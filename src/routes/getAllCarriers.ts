import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { RowDataPacket } from 'mysql2';

export const getAllCarriers = async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM transporters';
    const [transporters] = await pool.query<RowDataPacket[]>(query);
    if (transporters.length === 0) {
      res.status(404).json({ error: 'No Carriers found', message: 'No Carriers found' });
      console.error('No Carriers found');
    } else {
      res.status(200).json({ transporters, message: 'All Carriers retrieved successfully' });
      console.log('All Carriers retrieved successfully');
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message, message: 'Error retrieving Carriers' });
    console.error('Error retrieving Carriers:', error.message);
  }
};
