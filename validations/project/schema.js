import Joi from 'joi';

const ProjectPayloadSchema = Joi.object({
  name: Joi.string().required().min(5).max(30),
  color: Joi.string(),
});

const ProjectUpdatePayloadSchema = Joi.object({
  name: Joi.string().min(5).max(30),
  status: Joi.string(),
  color: Joi.string(),
});

export {
  ProjectPayloadSchema,
  ProjectUpdatePayloadSchema,
};
