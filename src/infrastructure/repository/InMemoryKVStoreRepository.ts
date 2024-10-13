import { KVStoreRepository } from '../../domain/kvstore/KVStoreRepository';

interface KeyValue {
    value: string;
    expiresAt?: number;
}

export class InMemoryKVStoreRepository implements KVStoreRepository {
    private store: Map<string, KeyValue> = new Map();

    set(key: string, value: string, ttl?: number): void {
        const expiresAt = ttl ? Date.now() + ttl * 1000 : undefined;
        this.store.set(key, { value, expiresAt });
    }

    get(key: string): string | null {
        const item = this.store.get(key);
        if (item && item.expiresAt && Date.now() > item.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return item ? item.value : null;
    }

    delete(key: string): boolean {
        return this.store.delete(key);
    }
}