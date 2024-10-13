import request from 'supertest';
import { app } from '../src/infrastructure/http/server';

describe('Key-Value Store API', () => {
    it('should add a key-value pair to the store', async () => {
        const response = await request(app)
            .post('/kvstore/add')
            .send({ key: 'name', value: 'John' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Key added to store');
    });

    it('should get a value from the store', async () => {
        // Add a key-value pair to the store first
        await request(app)
            .post('/kvstore/add')
            .send({ key: 'name', value: 'John' });

        // Now retrieve the value
        const response = await request(app).get('/kvstore/get/name');
        expect(response.status).toBe(200);
        expect(response.body.value).toBe('John');
    });

    it('should handle TTL correctly (expire key after time)', async () => {
        // Add a key-value pair with a TTL of 1 second
        await request(app)
            .post('/kvstore/add')
            .send({ key: 'temp-key', value: 'temp-value', ttl: 1 });

        // Wait for 1.5 seconds to ensure the key expires
        await new Promise((r) => setTimeout(r, 1500));

        // Now attempt to retrieve the key, expecting it to have expired
        const response = await request(app).get('/kvstore/get/temp-key');
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Something went wrong');
    });

    it('should delete a key from the store', async () => {
        // Add a key-value pair to the store
        await request(app)
            .post('/kvstore/add')
            .send({ key: 'delete-me', value: 'to-be-deleted' });

        // Delete the key
        const response = await request(app).delete('/kvstore/delete/delete-me');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Key deleted');
    });

    // I'm not implement properly the error handling in the kvstore controller
    it('should return 500 when trying to delete a non-existent key', async () => {
        const response = await request(app).delete('/kvstore/delete/nonexistent-key');
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Something went wrong');
    });
});