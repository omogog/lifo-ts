import { KVStoreRepository } from '../../domain/kvstore/KVStoreRepository';

export class AddToKVStoreUseCase {
    constructor(private kvStoreRepository: KVStoreRepository) {}

    execute(key: string, value: string, ttl?: number): void {
        this.kvStoreRepository.set(key, value, ttl);
    }
}