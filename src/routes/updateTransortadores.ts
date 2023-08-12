// updateTransporter.ts
import { Request, Response } from 'express';
import pool from '../dbConfig';
import { Transporter } from '../types/types';

export const updateTransporter = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedTransporter: Transporter = req.body;

  // Validação dos campos obrigatórios
  if (!updatedTransporter.name || !updatedTransporter.email || !updatedTransporter.phone) {
    return res.status(400).json({ message: 'Name, email, and phone are required fields' });
  }

  try {
    const result = await pool.query('UPDATE transporters SET ? WHERE id = ?', [updatedTransporter, id]);

    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: 'Transporter not found' });
    }

    res.json({ message: 'Transporter updated', affectedRows: result[0].affectedRows });
  } catch (error) {
    res.status(500).json({ message: 'Error updating transporter', error: error.message });
  }
};
