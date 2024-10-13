import { validate } from '../../shared/validation/validate';

export const validateAddToStack = (data: any) => {
    const schema = {
        item: 'string',
    };
    validate(schema, data);
};