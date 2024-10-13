// src/index.js
import express from "express";
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import prisma from "./prisma"; // Assuming this is correctly set up
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// Initialize environment variables
dotenv.config();

const app = express();

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  profilesSampleRate: 1.0, // Set sampling rate for profiling
});

// Middleware for Sentry request handling
app.use(Sentry.Handlers.requestHandler());
app.use(express.json()); // Middleware to parse JSON bodies

// Import routes for different entities
import userRoutes from './routes/user.routes';
import hostRoutes from './routes/host.routes';
import propertyRoutes from './routes/property.routes';
import amenityRoutes from './routes/amenities.routes';
import bookingRoutes from './routes/booking.routes';
import reviewRoutes from './routes/review.routes';

// Use imported routes for various entities
app.use('/users', userRoutes);
app.use('/hosts', hostRoutes);
app.use('/properties', propertyRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/amenities', amenityRoutes);

// Middleware for Sentry error handling
app.use(Sentry.Handlers.errorHandler());

// Default route
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
