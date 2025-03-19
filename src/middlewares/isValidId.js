import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, _res, next) => {
  const { contactId } = req.params;

  if (isValidObjectId(contactId) !== true) {
    return next(new createHttpError.BadRequest('ID is not valid'));
  }

  next();
};
