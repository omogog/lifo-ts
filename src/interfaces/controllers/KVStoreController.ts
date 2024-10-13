import { AddToKVStoreUseCase } from '../../application/kvstore/AddToKVStore';
import { GetFromKVStoreUseCase } from '../../application/kvstore/GetFromKVStore';
import { DeleteFromKVStoreUseCase } from '../../application/kvstore/DeleteKVStore';
import { KVStoreRepository } from '../../domain/kvstore/KVStoreRepository';
import { validateAddToKVStore } from '../dtos/KVStoreDTO';
import { ValidationError } from '../../shared/validation/validate';
import { Logger } from '../../shared/logger';

export class KVStoreController {
    private addToKVStoreUseCase: AddToKVStoreUseCase;
    private getFromKVStoreUseCase: GetFromKVStoreUseCase;
    private deleteFromKVStoreUseCase: DeleteFromKVStoreUseCase;

    constructor(kvStoreRepository: KVStoreRepository) {
        this.addToKVStoreUseCase = new AddToKVStoreUseCase(kvStoreRepository);
        this.getFromKVStoreUseCase = new GetFromKVStoreUseCase(kvStoreRepository);
        this.deleteFromKVStoreUseCase = new DeleteFromKVStoreUseCase(kvStoreRepository);
    }

    /**
     * @swagger
     * /kvstore/add:
     *   post:
     *     summary: Add a key-value pair to the store
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               key:
     *                 type: string
     *               value:
     *                 type: string
     *               ttl:
     *                 type: number
     *                 description: Time-to-live (TTL) in seconds
     *     responses:
     *       200:
     *         description: Key-value pair added successfully
     *       400:
     *         description: Validation error
     */
    addToKVStore(key: string, value: string, ttl?: number) {
        validateAddToKVStore({ key, value, ttl });
        this.addToKVStoreUseCase.execute(key, value, ttl);
        Logger.info(`Added key-value to store: ${key}`);
        return { message: 'Key added to store' };
    }

    /**
     * @swagger
     * /kvstore/get/{key}:
     *   get:
     *     summary: Get a value from the key-value store
     *     parameters:
     *       - name: key
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         description: The key to retrieve the value for
     *     responses:
     *       200:
     *         description: Retrieved key-value pair
     *       404:
     *         description: Key not found or expired
     */
    getFromKVStore(key: string) {
        const value = this.getFromKVStoreUseCase.execute(key);
        if (value) {
            Logger.info(`Retrieved value for key: ${key}`);
            return { value };
        } else {
            Logger.warn(`Key not found or expired: ${key}`);
            throw new ValidationError('Key not found or expired');
        }
    }

    /**
     * @swagger
     * /kvstore/delete/{key}:
     *   delete:
     *     summary: Delete a key from the key-value store
     *     parameters:
     *       - name: key
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         description: The key to delete
     *     responses:
     *       200:
     *         description: Key deleted successfully
     *       404:
     *         description: Key not found
     */
    deleteFromKVStore(key: string) {
        const result = this.deleteFromKVStoreUseCase.execute(key);
        if (result) {
            Logger.info(`Deleted key from store: ${key}`);
            return { message: 'Key deleted' };
        } else {
            Logger.warn(`Key not found: ${key}`);
            throw new ValidationError('Key not found');
        }
    }
}