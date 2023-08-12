import { Request, Response } from 'express';
import pool from '../dbConfig';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise'; // Importe os tipos ResultSetHeader e RowDataPacket

interface Transporter {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export const createTransporter = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, city, state, postalCode } = req.body;
    const query = 'INSERT INTO transporters (name, email, phone, address, city, state, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query<ResultSetHeader>(query, [name, email, phone, address, city, state, postalCode]);
    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Transporter created successfully' });
    } else {
      res.status(500).json({ error: 'Failed to create transporter' });
    }
  } catch (error: any) { // Definindo o tipo explicitamente como 'any'
    res.status(500).json({ error: error.message });
  }
};

export const updateTransporter = async (req: Request, res: Response) => {
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
    res.status(500).json({ error: (error as Error).message }); // Tipando o erro como Error
  }
};

export const deleteTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM transporters WHERE id = ?';
    const [result] = await pool.query<ResultSetHeader>(query, [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Transporter deleted successfully' });
    } else {
      res.status(404).json({ error: 'Transporter not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message }); // Tipando o erro como Error
  }
};

export const getAllTransporters = async (req: Request, res: Response) => {
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

export const getTransporterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM transporters WHERE id = ?';
    const [transporters] = await pool.query<RowDataPacket[]>(query, [id]); // Ajuste o tipo do resultado aqui
    if (transporters.length === 0) {
      res.status(404).json({ error: 'Transporter not found' });
    } else {
      const transporter = transporters[0] as Transporter; // Ajuste o tipo aqui
      res.status(200).json(transporter);
    }
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
};

