import { KVStoreRepository } from '../../domain/kvstore/KVStoreRepository';

export class DeleteFromKVStoreUseCase {
    constructor(private kvStoreRepository: KVStoreRepository) {}

    execute(key: string): boolean {
        return this.kvStoreRepository.delete(key);
    }
}