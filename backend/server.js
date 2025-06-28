import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

const usuariosValidados = ['arianne', 'ayelen', 'tomas', 'ezequiel', 'mauro', 'antonella', 'daniela'];

app.get('/validar/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();

  if (!nombre) {
    return res.status(400).json({ valido: false, error: 'Nombre no proporcionado' });
  }

  const valido = usuariosValidados.includes(nombre);

  return res.json({ valido: valido });
});

app.get('/saludo/:nombre', (req, res) => {
  const nombre = req.params.nombre;

  if (!nombre) {
    return res.status(400).json({ mensaje: 'Nombre no escrito' });
  }

  return res.json({ mensaje: `Hola y Bienvenido, ${nombre}` });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
