import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { ResultSetHeader } from 'mysql2';

export const createCarriers = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, city, state, postalCode } = req.body;
    const query = 'INSERT INTO transporters (name, email, phone, address, city, state, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query<ResultSetHeader>(query, [name, email, phone, address, city, state, postalCode]);
    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Transporter created successfully' });
    } else {
      res.status(500).json({ error: 'Failed to create transporter' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
