import { KVStoreRepository } from '../../domain/kvstore/KVStoreRepository';

export class GetFromKVStoreUseCase {
    constructor(private kvStoreRepository: KVStoreRepository) {}

    execute(key: string): string | null {
        return this.kvStoreRepository.get(key);
    }
}