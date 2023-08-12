// getTransporterById.ts
import { Request, Response } from 'express';
import pool from '../dbConfig';
import { Transporter } from '../types/transporterTypes';

export const getTransporterById = async (req: Request, res: Response) => {
  const id = req.params.id;

  // Verificação se o ID é um número válido
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid transporter ID' });
  }

  try {
    const [rows] = await pool.query<Transporter[]>('SELECT * FROM transporters WHERE id = ?', [id]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Transporter not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transporter', error: error.message });
  }
};
