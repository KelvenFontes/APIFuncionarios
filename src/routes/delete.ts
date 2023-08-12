// deleteTransporter.ts
import { Request, Response } from 'express';
import pool from '../dbConfig';

export const deleteTransporter = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Verificação se o ID é um número válido
    if (isNaN(Number(id))) {
      return res.status(400).json({ message: 'Invalid transporter ID' });
    }

    const result = await pool.query('DELETE FROM transporters WHERE id = ?', [id]);

    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: 'Transporter not found' });
    }

    res.json({ message: 'Transporter deleted', affectedRows: result[0].affectedRows });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transporter', error: error.message });
  }
};
