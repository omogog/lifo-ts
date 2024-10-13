import { StackRepository } from '../../domain/stack/StackRepository';

export class AddToStackUseCase {
    constructor(private stackRepository: StackRepository<string>) {}

    execute(item: string): void {
        this.stackRepository.push(item);
    }
}