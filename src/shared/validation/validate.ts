export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export const validate = (schema: Record<string, string>, data: Record<string, any>) => {
    for (const key in schema) {
        const expectedType = schema[key];
        const value = data[key];

        if (typeof value === "undefined") {
            throw new ValidationError(`Missing required field: ${key}`);
        }

        if (typeof value !== expectedType) {
            throw new ValidationError(`Invalid type for field: ${key}. Expected ${expectedType}, got ${typeof value}`);
        }
    }
};