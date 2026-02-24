import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/errorMiddleware';

import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import expertRoutes from './routes/expertRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import adminRoutes from './routes/adminRoutes';
import meRoutes from './routes/meRoutes';
import expertPrivateRoutes from './routes/expertPrivateRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/experts', expertRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/admin', adminRoutes);
app.use('/me', meRoutes);
app.use('/expert', expertPrivateRoutes); // Handles /expert/me/...

// Error Handler
app.use(errorHandler);

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
