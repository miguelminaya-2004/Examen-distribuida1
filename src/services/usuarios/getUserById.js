import { getConnection } from '../../db/context.js'; 

export const getUserById = async (id) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', id)
      .query('SELECT * FROM Usuarios WHERE id = @id');

    if (result.recordset.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    return result.recordset[0];
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};
