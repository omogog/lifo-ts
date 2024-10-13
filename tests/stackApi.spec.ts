import request from 'supertest';
import { app } from '../src/infrastructure/http/server';

describe('Stack API', () => {
    it('should add an item to the stack', async () => {
        const response = await request(app)
            .post('/stack/add')
            .send({ item: 'test' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Item added to stack');
    });

    it('should get the top item from the stack', async () => {
        // Add an item to the stack first
        await request(app)
            .post('/stack/add')
            .send({ item: 'test-item' });

        // Now retrieve the top item from the stack
        const response = await request(app).get('/stack/get');
        expect(response.status).toBe(200);
        expect(response.body.item).toBe('test-item');
    });

    // im not implement properly the error handling in the stack controller
    it('should return 500 when stack is empty', async () => {
        // Empty the stack and try to retrieve an item
        await request(app).get('/stack/get');
        const response = await request(app).get('/stack/get');
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Something went wrong');
    });
});