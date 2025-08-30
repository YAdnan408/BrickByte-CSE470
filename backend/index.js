// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import path from 'path';
// import cors from 'cors';
// import { fileURLToPath } from 'url';
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import uploadRouter from './routes/upload.route.js';
// import cookieParser from 'cookie-parser';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log('MongoDB connected succesfully!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//   const __dirname = path.resolve()

// const app = express();

// app.use(express.json());

// app.use(cookieParser());

// // Serve static files from uploads directory
// app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));

// app.listen(3000, () => {
//   console.log('Server is running on port 3000!');
// });

// app.use('/backend/user', userRouter);
// app.use('/backend/auth', authRouter);
// app.use('/backend/listing', listingRouter);
// app.use('/backend/upload', uploadRouter);

// app.use(express.static(path.join(__dirname, '/frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// })




// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import uploadRouter from './routes/upload.route.js';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/backend/user', userRouter);
app.use('/backend/auth', authRouter);
app.use('/backend/listing', listingRouter);
app.use('/backend/upload', uploadRouter);

// Serve static files from frontend dist
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});