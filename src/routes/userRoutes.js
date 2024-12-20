import express from 'express';
import { createUser } from '../services/usuarios/createUser.js';
import { deleteUser } from '../services/usuarios/deleteUser.js';
import { editUser } from '../services/usuarios/editUser.js';
import { loginUser } from '../services/usuarios/loginUser.js';
import { getUserById } from '../services/usuarios/getUserById.js';

const userRoutes = express.Router();

userRoutes.get('/login', (req, res) => {
  return res.render('usuarios/login', { error: 'Usuario o contraseña incorrectos' });
});
userRoutes.post('/login', async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const result = await loginUser(usuario, contraseña);
    if (result.success) {
      req.session.user = result.user; 
      return res.redirect('/panel/login');
    } else {
      return res.render('usuarios/login', { error: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error al intentar iniciar sesión', error });
  }
});

userRoutes.get('/crear', (req, res) => {
  return res.render('usuarios/crear');
});

userRoutes.post('/crear', async (req, res) => {
  try {
    const { nombre, usuario, contraseña } = req.body;
    await createUser(nombre, usuario, contraseña);
    return res.redirect('/usuarios/crear'); 
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error al crear el usuario', error });
  }
});

userRoutes.get('/editar/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserById(id);
    return res.render('usuarios/editar', { user });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error al obtener el usuario para editar', error });
  }
});

userRoutes.post('/editar', async (req, res) => {
  try {
    const { id, nombre, usuario, contraseña } = req.body;
    await editUser(id, nombre, usuario, contraseña);
    return res.redirect('/usuarios/editar');
  } catch (error) {
    console.log(error); 
    return res.json({ message: 'Error al editar el usuario', error });
  }
});

userRoutes.post('/delete/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteUser(id);
    return res.redirect('/usuarios/delete');
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error al eliminar el usuario', error });
  }
});

userRoutes.get('/panel', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/usuarios/login'); 
  }
  return res.render('usuarios/panel', { user: req.session.user });
});

export default userRoutes;
