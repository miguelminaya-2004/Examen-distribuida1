import bcrypt from 'bcryptjs';
import { getConnection } from '../../db/context.js'; 

export const createUser = async (nombre, usuario, contraseña) => {
  try {
    const pool = await getConnection(); 

    const existingUser = await pool.request()
      .input('usuario', usuario)
      .query('SELECT * FROM Usuarios WHERE usuario = @usuario');

    if (existingUser.recordset.length > 0) {
      throw new Error('El nombre de usuario ya está en uso');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    await pool.request()
      .input('nombre', nombre)
      .input('usuario', usuario)
      .input('contraseña', hashedPassword)
      .query('INSERT INTO Usuarios (nombre, usuario, contraseña) VALUES (@nombre, @usuario, @contraseña)');

    return { message: 'Usuario creado exitosamente' };
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};
