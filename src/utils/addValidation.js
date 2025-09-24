import { STATUS_CODES } from '../constants/index.js';
import ApiError from './ApiError.js';

function addValidation(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body || {});

    if (error) {
      const errorMessage = error.details.map((err) => err.message).join(', ');
      return next(new ApiError(STATUS_CODES.BAD_REQUEST, errorMessage));
    }

    next();
  };
}

export default addValidation;
