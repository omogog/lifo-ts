import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger/swaggerConfig';
import { StackController } from '../../interfaces/controllers/StackController';
import { KVStoreController } from '../../interfaces/controllers/KVStoreController';
import { InMemoryStackRepository } from '../repository/InMemoryStackRepository';
import { InMemoryKVStoreRepository } from '../repository/InMemoryKVStoreRepository';
import { expressErrorHandler } from '../../shared/middleware/expressErrorAdapter';  // Use the adapter

const stackRepository = new InMemoryStackRepository<string>();
const kvStoreRepository = new InMemoryKVStoreRepository();

const stackController = new StackController(stackRepository);
const kvStoreController = new KVStoreController(kvStoreRepository);

const app = express();
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post('/stack/add', (req, res) => {
    const result = stackController.addToStack(req.body.item);
    res.status(200).send(result);
});

app.get('/stack/get', (req, res) => {
    const result = stackController.getFromStack();
    res.status(200).send(result);
});

app.post('/kvstore/add', (req, res) => {
    const result = kvStoreController.addToKVStore(req.body.key, req.body.value, req.body.ttl);
    res.status(200).send(result);
});

app.get('/kvstore/get/:key', (req, res) => {
    const result = kvStoreController.getFromKVStore(req.params.key);
    res.status(200).send(result);
});

app.delete('/kvstore/delete/:key', (req, res) => {
    const result = kvStoreController.deleteFromKVStore(req.params.key);
    res.status(200).send(result);
});

app.use(expressErrorHandler);

export { app };