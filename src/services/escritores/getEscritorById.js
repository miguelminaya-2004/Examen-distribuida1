import { getConnection } from '../../db/context.js';
import mssql from 'mssql';

export const getEscritorById = async (id) => {
  try {
    const pool = await getConnection(); 
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query('SELECT * FROM Escritores WHERE id = @id');
    return result.recordset[0]; 
  } catch (error) {
    console.error('Error al obtener el escritor por ID:', error);
    throw error;
  }
};
