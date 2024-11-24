import {config} from "dotenv";
config()
import { setupDB } from "./db/knexfile.js";
import jwt from 'jsonwebtoken';
import { Model } from 'objection';
import knex from 'knex';
import knexConfig from './db/knexfile.js';
import authMiddleware from './middleware/authMiddleware.js';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

import express from 'express';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
import habitRoutes from './routes/habits.js';
import pomodoroRoutes from './routes/pomodoroSessions.js';

setupDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/pomodoro_sessions', pomodoroRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));