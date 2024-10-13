import { StackRepository } from '../../domain/stack/StackRepository';

export class GetFromStackUseCase {
    constructor(private stackRepository: StackRepository<string>) {}

    execute(): string | undefined {
        return this.stackRepository.pop();
    }
}