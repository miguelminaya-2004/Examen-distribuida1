import { getConnection } from '../../db/context.js';
import mssql from 'mssql';

export const createEscritor = async (nombre, alias, fechaNacimiento, imagen, biografia) => {
  try {
    const pool = await getConnection(); 
    await pool.request()
      .input('nombre', mssql.VarChar, nombre)
      .input('alias', mssql.VarChar, alias)
      .input('fechaNacimiento', mssql.Date, fechaNacimiento)
      .input('imagen', mssql.VarChar, imagen)
      .input('biografia', mssql.Text, biografia)
      .query('INSERT INTO Escritores (nombre, alias, fechaNacimiento, imagen, biografia) VALUES (@nombre, @alias, @fechaNacimiento, @imagen, @biografia)');
    
    return { message: 'Escritor creado exitosamente' };
  } catch (error) {
    console.error('Error al crear el escritor:', error);
    throw new Error('Error al crear el escritor: ' + error.message);
  }
};
