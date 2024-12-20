import { getConnection } from '../../db/context.js';
import mssql from 'mssql';

export const editEscritor = async (id, nombre, alias, fechaNacimiento, imagen, biografia) => {
  try {
    const pool = await getConnection();
    
    const result = await pool.request()
      .input('id', mssql.Int, id) 
      .input('nombre', mssql.VarChar, nombre) 
      .input('alias', mssql.VarChar, alias) 
      .input('fechaNacimiento', mssql.Date, fechaNacimiento)
      .input('imagen', mssql.VarChar, imagen) 
      .input('biografia', mssql.Text, biografia) 
      .query('UPDATE Escritores SET nombre = @nombre, alias = @alias, fechaNacimiento = @fechaNacimiento, imagen = @imagen, biografia = @biografia WHERE id = @id'); // Consulta para actualizar el escritor

    return result;
  } catch (error) {
    console.error('Error al editar el escritor:', error); 
    throw error; 
  }
};
