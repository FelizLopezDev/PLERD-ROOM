/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('[PLERD ROOM] Advertencia: GEMINI_API_KEY no encontrada en las variables de entorno. Se utilizarán respuestas simuladas.');
}

// Ruta vacía /api/chat
app.post('/api/chat', async (req, res) => {
  const { message, notebookId, sources } = req.body;
  if (!apiKey) {
    return res.json({
      text: 'Respuesta simulada: El asistente responde exclusivamente con base en los documentos de este cuaderno.',
      citations: [],
    });
  }
  return res.json({ text: '', citations: [] });
});

// Ruta vacía /api/study
app.post('/api/study', async (req, res) => {
  const { action, sourceId } = req.body;
  if (!apiKey) {
    return res.json({
      summary: 'Resumen simulado del contenido seleccionado.',
      keyPoints: ['Punto clave 1', 'Punto clave 2'],
    });
  }
  return res.json({ summary: '', keyPoints: [] });
});

// Ruta vacía /api/exam
app.post('/api/exam', async (req, res) => {
  const { notebookId, sources } = req.body;
  if (!apiKey) {
    return res.json({
      questions: [],
    });
  }
  return res.json({ questions: [] });
});

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[PLERD ROOM] Servidor activo en http://localhost:${port}`);
  });
}

startServer();
