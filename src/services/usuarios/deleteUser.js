import { getConnection } from '../../db/context.js'; // Usamos getConnection para la conexión

export const deleteUser = async (id) => {
  try {
    const pool = await getConnection();

    const result = await pool.request()
      .input('id', id)
      .query('DELETE FROM Usuarios WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      throw new Error('No se encontró el usuario con ese ID');
    }

    return { message: 'Usuario eliminado exitosamente' };
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};
