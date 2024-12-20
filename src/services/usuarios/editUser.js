import bcrypt from 'bcryptjs';
import { getConnection } from '../../db/context.js'; 

export const editUser = async (id, nombre, usuario, contraseña) => {
  try {
    let hashedPassword = null;

    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(contraseña, salt);
    }

    const pool = await getConnection();

    if (hashedPassword) {
      await pool.request()
        .input('nombre', nombre)
        .input('usuario', usuario)
        .input('contraseña', hashedPassword)
        .input('id', id)
        .query('UPDATE Usuarios SET nombre = @nombre, usuario = @usuario, contraseña = @contraseña WHERE id = @id');
    } else {
      await pool.request()
        .input('nombre', nombre)
        .input('usuario', usuario)
        .input('id', id)
        .query('UPDATE Usuarios SET nombre = @nombre, usuario = @usuario WHERE id = @id');
    }

    return { message: 'Usuario actualizado exitosamente' };
  } catch (error) {
    throw new Error('Error al editar el usuario: ' + error.message);
  }
};
