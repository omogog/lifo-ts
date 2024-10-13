import { AddToStackUseCase } from '../../application/stack/AddToStack';
import { GetFromStackUseCase } from '../../application/stack/GetFromStack';
import { StackRepository } from '../../domain/stack/StackRepository';
import { validateAddToStack } from '../dtos/StackDTO';
import { ValidationError } from '../../shared/validation/validate';
import { Logger } from '../../shared/logger';

export class StackController {
    private addToStackUseCase: AddToStackUseCase;
    private getFromStackUseCase: GetFromStackUseCase;

    constructor(stackRepository: StackRepository<string>) {
        this.addToStackUseCase = new AddToStackUseCase(stackRepository);
        this.getFromStackUseCase = new GetFromStackUseCase(stackRepository);
    }

    /**
     * @swagger
     * /stack/add:
     *   post:
     *     summary: Add an item to the stack
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               item:
     *                 type: string
     *                 description: Item to add to the stack
     *     responses:
     *       200:
     *         description: Item added to stack successfully
     *       400:
     *         description: Validation error
     */
    addToStack(item: string) {
        validateAddToStack({ item });
        this.addToStackUseCase.execute(item);
        Logger.info(`Added item to stack: ${item}`);
        return { message: 'Item added to stack' };
    }

    /**
     * @swagger
     * /stack/get:
     *   get:
     *     summary: Get the top item from the stack
     *     responses:
     *       200:
     *         description: Top item from the stack
     *       404:
     *         description: Stack is empty
     */
    getFromStack() {
        const item = this.getFromStackUseCase.execute();
        if (item) {
            Logger.info(`Retrieved item from stack: ${item}`);
            return { item };
        } else {
            Logger.warn('Stack is empty');
            throw new ValidationError('Stack is empty');
        }
    }
}