import express from 'express';
import { getConnection } from '../db/context.js';
import { createEscritor } from '../services/escritores/createEscritor.js';
import { deleteEscritor } from '../services/escritores/deleteEscritor.js';
import { editEscritor } from '../services/escritores/editEscritor.js';
import { getEscritorById } from '../services/escritores/getEscritorById.js';

const escritoresRoutes = express.Router();

escritoresRoutes.get('/', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Escritores');
    return res.render('escritores/index', { escritores: result.recordset });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error al obtener los escritores', error });
  }
});

escritoresRoutes.get('/crear', (req, res) => {
  return res.render('escritores/crear');
});

escritoresRoutes.post('/crear', async (req, res) => {
  try {
    const { nombre, alias, fechaNacimiento, imagen, biografia } = req.body;
    await createEscritor(nombre, alias, fechaNacimiento, imagen, biografia);
    return res.redirect('/escritores/crear');
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error al crear el escritor', error });
  }
});


escritoresRoutes.get('/editar/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const escritor = await getEscritorById(id); 
    return res.render('escritores/editar', { escritor });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error al obtener el escritor para editar', error });
  }
});

escritoresRoutes.post('/editar', async (req, res) => {
  try {
    const { id, nombre, alias, fechaNacimiento, imagen, biografia } = req.body;
    await editEscritor(id, nombre, alias, fechaNacimiento, imagen, biografia);
    return res.redirect('/escritores/editar'); 
  } catch (error) {
    console.log(error); 
    return res.json({ message: 'Error al editar el escritor', error });
  }
});

escritoresRoutes.post('/delete/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteEscritor(id);
    return res.redirect('/escritores/eliminar'); 
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error al eliminar el escritor', error });
  }
});

export default escritoresRoutes;
