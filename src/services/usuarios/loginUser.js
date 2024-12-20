import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getConnection } from '../../db/context.js';

export const loginUser = async (usuario, contraseña) => {
  try {
    const pool = await getConnection(); 

    const result = await pool.request()
      .input('usuario', usuario)
      .query('SELECT * FROM Usuarios WHERE usuario = @usuario');

    if (result.recordset.length === 0) {
      throw new Error('Credenciales incorrectas');
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);

    if (!isMatch) {
      throw new Error('Credenciales incorrectas');
    }
    const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    return { token, user };
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};
