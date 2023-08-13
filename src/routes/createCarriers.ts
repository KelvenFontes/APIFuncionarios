import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { ResultSetHeader } from 'mysql2';
import { Carriers } from '../types/carriersTypes';

export const createCarriers = async (req: Request, res: Response) => {
  try {

    const transporterData: Omit<Carriers, 'createdAt'> = req.body;

    if (!transporterData.hasOwnProperty('isActive')) {
      transporterData.isActive = true;
    }

    const query = 'INSERT INTO transporters (CNPJ, corporateName, fantasyName, address, city, UF, postalCode, phone, email, isActive, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
    const [result] = await pool.query<ResultSetHeader>(query, [
      transporterData.CNPJ,
      transporterData.corporateName,
      transporterData.fantasyName,
      transporterData.address,
      transporterData.city,
      transporterData.UF,
      transporterData.postalCode,
      transporterData.phone,
      transporterData.email,
      transporterData.isActive
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

