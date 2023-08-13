import { Request, Response } from 'express';
import pool from '../config/dbConfig';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Carriers } from '../types/carriersTypes';

// Função para validar o formato de e-mail usando expressão regular
function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export const createCarriers = async (req: Request, res: Response) => {
  try {
    const transporterData: Omit<Carriers, 'createdAt'> = req.body;

    if (!transporterData.hasOwnProperty('isActive')) {
      transporterData.isActive = true;
    }

    // Campos obrigatórios
    const requiredFields: (keyof Omit<Carriers, 'createdAt'>)[] = [
      'CNPJ', 'corporateName', 'address', 'city', 'UF', 'postalCode', 'phone', 'email'
    ];

    // Verificar campos obrigatórios
    const missingFields: string[] = [];

    for (const field of requiredFields) {
      if (!transporterData[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // Verificar se o e-mail tem um formato válido
    if (!isValidEmail(transporterData.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Verificar se o CNPJ tem mais de 14 caracteres
    if (transporterData.CNPJ.length > 14) {
      return res.status(400).json({ error: 'CNPJ must have at most 14 characters' });
    }

    // Verificar se o "UF" tem mais de 2 caracteres
    if (transporterData.UF.length > 2) {
      return res.status(400).json({ error: 'UF must have at most 2 characters' });
    }

    // Verificar se o "postalCode" tem mais de 8 caracteres
    if (transporterData.postalCode.length > 8) {
      return res.status(400).json({ error: 'Postal code must have at most 8 characters' });
    }

    // Verificar se o telefone tem mais de 15 caracteres
    if (transporterData.phone.length > 15) {
      return res.status(400).json({ error: 'Phone number must have at most 15 characters' });
    }

    // Verificar se o CNPJ já existe no banco de dados
    const cnpjExistsQuery = 'SELECT COUNT(*) AS count FROM transporters WHERE CNPJ = ?';
    const [cnpjExistsResult] = await pool.query<RowDataPacket[]>(cnpjExistsQuery, [transporterData.CNPJ]);

    if (cnpjExistsResult[0].count > 0) {
      return res.status(400).json({ error: 'Transporter with the same CNPJ already exists' });
    }

    const insertQuery = 'INSERT INTO transporters (CNPJ, corporateName, fantasyName, address, city, UF, postalCode, phone, email, isActive, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
    const [result] = await pool.query<ResultSetHeader>(insertQuery, [
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
