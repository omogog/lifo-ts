export interface StackRepository<T> {
    push(item: T): void;
    pop(): T | undefined;
}