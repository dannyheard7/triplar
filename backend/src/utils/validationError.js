import {ValidationError} from "./errors";

export function convertMongooseValidationErrorToGraphqlValidationError(validationError) {
    const errors = [];

    Object.values(validationError.errors).forEach(function (value) {
        errors.push({key: value.path, message: value.message})
    });

    throw new ValidationError(errors);
}