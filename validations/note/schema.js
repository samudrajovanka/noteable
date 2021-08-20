import Joi from 'joi';

const NotePayloadSchema = Joi.object({
  title: Joi.string().required().min(5).max(30),
  description: Joi.string().required().max(300),
  color: Joi.string(),
});

const NoteUpdatePayloadSchema = Joi.object({
  title: Joi.string().min(5).max(30),
  description: Joi.string().max(300),
  color: Joi.string(),
  pinned: Joi.boolean(),
});

export {
  NotePayloadSchema,
  NoteUpdatePayloadSchema,
};
