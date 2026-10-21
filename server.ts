/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

// Límite de express.json subido a 10mb
app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn('[PLERD ROOM] Advertencia: GEMINI_API_KEY no encontrada en las variables de entorno.');
}

// Ruta /api/chat: responde estrictamente con base en las fuentes marcadas
app.post('/api/chat', async (req, res) => {
  const { message, history, sources } = req.body;

  if (!apiKey || !ai) {
    return res.status(503).json({
      error: 'No se encontró la clave GEMINI_API_KEY en el servidor. Configura la clave en las variables de entorno para activar las consultas.',
    });
  }

  if (!Array.isArray(sources) || sources.length === 0) {
    return res.status(400).json({
      error: 'Marca al menos una fuente para formular consultas.',
    });
  }

  const sourcesContext = sources
    .map(
      (s: { title: string; content: string }, index: number) =>
        `[FUENTE ${index + 1}: "${s.title}"]\n${s.content}\n[FIN FUENTE ${index + 1}]`
    )
    .join('\n\n');

  const systemInstruction = `Responde solo con el contenido de las fuentes proporcionadas. Cita siempre el título de la fuente y la sección. Si la respuesta no está en ellas, di claramente que no aparece en las fuentes y no uses conocimiento externo.\n\nFUENTES SUMINISTRADAS:\n${sourcesContext}`;

  const contents: any[] = [];
  if (Array.isArray(history)) {
    for (const h of history) {
      if (h.sender && h.text) {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      }
    }
  }

  contents.push({
    role: 'user',
    parts: [{ text: message || '' }],
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingBudget: 1024,
        },
      },
    });

    const text = response.text || '';
    if (!text.trim()) {
      return res.status(500).json({
        error: 'El modelo no generó texto para esta consulta. Intenta reformularla.',
      });
    }

    return res.json({ text });
  } catch (err: any) {
    console.error('[PLERD ROOM] Error de Gemini en /api/chat:', err);
    return res.status(500).json({
      error: `Error al consultar Gemini (${err?.message || 'Fallo de conexión'}).`,
    });
  }
});

// Ruta /api/study: genera resumen, puntos clave o glosario de las fuentes marcadas
app.post('/api/study', async (req, res) => {
  const { action, sources } = req.body;

  if (!apiKey || !ai) {
    return res.status(503).json({
      error: 'No se encontró la clave GEMINI_API_KEY en el servidor. Configura la clave en las variables de entorno.',
    });
  }

  if (!Array.isArray(sources) || sources.length === 0) {
    return res.status(400).json({
      error: 'Marca al menos una fuente para generar material de estudio.',
    });
  }

  const sourcesContext = sources
    .map(
      (s: { title: string; content: string }, index: number) =>
        `[FUENTE ${index + 1}: "${s.title}"]\n${s.content}\n[FIN FUENTE ${index + 1}]`
    )
    .join('\n\n');

  let promptAction = '';
  if (action === 'summary') {
    promptAction = 'Elabora un resumen conciso y fiel estructurado en párrafos cortos, basado únicamente en las fuentes anteriores. Cita los títulos de las fuentes.';
  } else if (action === 'keypoints') {
    promptAction = 'Extrae los puntos clave y reglas obligatorias en una lista con viñetas, fundamentados únicamente en las fuentes anteriores. Cita los títulos de las fuentes.';
  } else if (action === 'glossary') {
    promptAction = 'Elabora un glosario con los términos y conceptos reglamentarios esenciales definidos o explicados en las fuentes anteriores. Cada término debe tener una definición precisa basada en el texto.';
  } else {
    return res.status(400).json({ error: 'Acción de estudio no reconocida.' });
  }

  const systemInstruction = `Responde solo con el contenido de las fuentes proporcionadas. Cita siempre el título de la fuente y la sección. Si la respuesta no está en ellas, di claramente que no aparece en las fuentes y no uses conocimiento externo.\n\nFUENTES SUMINISTRADAS:\n${sourcesContext}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts: [{ text: promptAction }] }],
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingBudget: 1024,
        },
      },
    });

    const text = response.text || '';
    if (!text.trim()) {
      return res.status(500).json({
        error: 'El modelo no devolvió contenido para esta acción.',
      });
    }

    return res.json({ text });
  } catch (err: any) {
    console.error('[PLERD ROOM] Error de Gemini en /api/study:', err);
    return res.status(500).json({
      error: `Error al generar material de estudio con Gemini (${err?.message || 'Fallo de conexión'}).`,
    });
  }
});

// Ruta /api/exam: reservada para generación de preguntas
app.post('/api/exam', async (req, res) => {
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
