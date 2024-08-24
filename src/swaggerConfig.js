// swagger-config.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing users',
    },
  },
  apis: ['./routes/user.routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
