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
  ACCESS_TOKEN_EXPIRY,
  STRIPE_WEBHOOK_SECRET,
  STRIPE_SECRET_KEY,
  FRONTEND_URL,
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL,
  UNIVERSE_DOMAIN
} = process.env;

const FIREBASE_CONFIG = {
  type: TYPE,
  project_id: PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: CLIENT_EMAIL,
  client_id: CLIENT_ID,
  auth_uri: AUTH_URI,
  token_uri: TOKEN_URI,
  auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: CLIENT_X509_CERT_URL,
  universe_domain: UNIVERSE_DOMAIN
};

export {
  PORT,
  NODE_ENV,
  CORS_ORIGIN,
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  STRIPE_WEBHOOK_SECRET,
  STRIPE_SECRET_KEY,
  FRONTEND_URL,
  FIREBASE_CONFIG
};
