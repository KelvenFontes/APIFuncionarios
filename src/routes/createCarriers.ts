import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { ResultSetHeader } from 'mysql2';
import { Carriers } from '../types/carriersTypes';

export const createCarriers = async (req: Request, res: Response) => {
  try {
    const transporterData: Carriers = req.body;

    // Se você quiser adicionar o campo 'isActive' como true por padrão
    if (!transporterData.hasOwnProperty('isActive')) {
      transporterData.isActive = true;
    }

    const query = 'INSERT INTO transporters (name, email, phone, address, city, state, postalCode) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query<ResultSetHeader>(query, [
      transporterData.name,
      transporterData.email,
      transporterData.phone,
      transporterData.address,
      transporterData.city,
      transporterData.state,
      transporterData.postalCode,
      // transporterData.isActive,
    ]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Transporter created successfully' });
    } else {
      res.status(500).json({ error: 'Failed to create transporter' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

