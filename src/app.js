import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ApiError from './utils/ApiError.js';
import { CORS_ORIGIN } from './configs/env.config.js';
import router from './routes/index.js';
import logger from './utils/logger.js';
import compression from 'compression';
import helmet from 'helmet';
import { MESSAGES, STATUS_CODES } from './constants/index.js';

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true
  })
);

const morganFormat = ':method :url :status :response-time ms';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3]
        };
        logger.info(JSON.stringify(logObject));
      }
    }
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

app.use('/api/v1', router);
app.all('*', (req, res, next) => {
  next(new ApiError(STATUS_CODES.NOT_FOUND, 'Route not found'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const {
    status = STATUS_CODES.INTERNAL_SERVER_ERROR,
    message = MESSAGES.ERROR
  } = err;
  res.status(status).json({ error: message, success: false });
});

export { app };
