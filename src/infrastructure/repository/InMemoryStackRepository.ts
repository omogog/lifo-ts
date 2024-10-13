import { StackRepository } from '../../domain/stack/StackRepository';

export class InMemoryStackRepository<T> implements StackRepository<T> {
    private stack: T[] = [];

    push(item: T): void {
        this.stack.push(item);
    }

    pop(): T | undefined {
        return this.stack.pop();
    }
}