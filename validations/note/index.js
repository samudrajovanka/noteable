import InvariantError from '@exceptions/InvariantError';
import { NotePayloadSchema, NoteUpdatePayloadSchema } from './schema';

const noteValidation = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateNoteUpdatePayload: (payload) => {
    const validationResult = NoteUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default noteValidation;
