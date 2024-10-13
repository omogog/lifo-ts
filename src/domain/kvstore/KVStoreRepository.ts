export interface KVStoreRepository {
    set(key: string, value: string, ttl?: number): void;
    get(key: string): string | null;
    delete(key: string): boolean;
}