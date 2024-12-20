import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { dirname, join } from 'path';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';  
import usuariosRoutes from './routes/userRoutes.js';  
import escritoresRoutes from './routes/escritoresRoutes.js';  
import { fileURLToPath } from 'url';  

const app = express();

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use('/usuarios', usuariosRoutes);  
app.use('/escritores', escritoresRoutes); 
app.get('/', (req, res) => {
  res.render('index'); 
});

app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.error(error); 
  res.status(error.status || 500).json({
    message: error.message || 'Error interno del servidor',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
