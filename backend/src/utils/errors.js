import { GraphQLError } from 'graphql';

export class RestError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

export class ValidationError extends GraphQLError {
    constructor(errors) {
        super('The request is invalid.');
        this.state = errors.reduce((result, error) => {
            if (error.key in result) {
                result[error.key].push(error.message);
            } else {
                result[error.key] = [error.message];
            }
            return result;
        }, {});
    }
}