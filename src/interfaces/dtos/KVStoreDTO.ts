import { validate } from '../../shared/validation/validate';
import { ValidationError } from '../../shared/validation/validate';

export const validateAddToKVStore = (data: any) => {
    const schema = {
        key: 'string',
        value: 'string',
    };
    validate(schema, data);
    if (data.ttl && typeof data.ttl !== 'number') {
        throw new ValidationError('TTL must be a number');
    }
};