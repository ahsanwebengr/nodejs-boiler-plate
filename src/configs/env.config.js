import dotenv from 'dotenv';
dotenv.config({
  path: './.env'
});

const {
  PORT,
  NODE_ENV,
  CORS_ORIGIN,
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY
} = process.env;

export {
  PORT,
  NODE_ENV,
  CORS_ORIGIN,
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY
};
