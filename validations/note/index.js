import InvariantError from '@exceptions/InvariantError';
import { VALIDATION_ERR } from '@lib/constantErrorType';
import { NotePayloadSchema, NoteUpdatePayloadSchema } from './schema';

const noteValidation = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  },
  validateNoteUpdatePayload: (payload) => {
    const validationResult = NoteUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, VALIDATION_ERR);
    }
  },
};

export default noteValidation;
