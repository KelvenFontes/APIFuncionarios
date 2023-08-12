// createTransporter.ts
import { Request, Response } from 'express';
import pool from '../dbConfig';
import { Transporter } from '../types/types';

export const createTransporter = async (req: Request, res: Response) => {
  const newTransporter: Transporter = req.body;

  // Validação dos campos obrigatórios
  if (!newTransporter.name || !newTransporter.email || !newTransporter.phone) {
    return res.status(400).json({ message: 'Name, email, and phone are required fields' });
  }

  try {
    const result = await pool.query('INSERT INTO transporters SET ?', [newTransporter]);
    const insertedId = result[0].insertId;
    res.status(201).json({ message: 'Transporter created', insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating transporter', error: error.message });
  }
};
