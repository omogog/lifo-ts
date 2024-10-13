import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'In-memory Stack and Key-Value Store API',
            version: '1.0.0',
            description: 'Simple in-memory stack and key-value store API with TTL.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/interfaces/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsDoc(options);