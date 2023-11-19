import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import connectMongoDB from './config/db/mongodb.js';
import createHttpError from 'http-errors';
import authRouter from './routes/user.auth.routes.js';
import notesRouter from './routes/notes.routes.js';
config();

const app = express();

// global middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(','),
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//Routes
//Auth routes
app.use('/auth', authRouter);
// Note routes
app.use('/notes', notesRouter);

// Home API endpoint
app.get('/', function (request, response) {
  response.status(200).send('🙋‍♂️, Hello! welcome to EasyNotes Backend!');
});

// 404 error handling
app.use((req, res, next) => {
  next(new createHttpError.NotFound('URL does not Exist'));
});
// Error Handler (middleware)
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};
app.use(errorHandler);

// Initialize Server
const startServer = () => {
  app.listen(process.env.PORT || 8080, () => {
    console.log('The server started in: ' + process.env.PORT + '😁✨');
  });
};
connectMongoDB()
  .then(() => startServer())
  .catch((err) => {
    console.error('Mongodb connection error: ', err);
  });
