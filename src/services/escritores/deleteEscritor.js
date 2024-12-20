import { getConnection } from '../../db/context.js';
import mssql from 'mssql';

export const deleteEscritor = async (id) => {
  try {
    const pool = await getConnection(); 
    const result = await pool.request()
      .input('id', mssql.Int, id) 
      .query('DELETE FROM Escritores WHERE id = @id');
    return result;
  } catch (error) {
    console.error('Error al eliminar el escritor:', error);
    throw error;
  }
};


