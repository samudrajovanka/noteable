import Joi from 'joi';

const ProjectPayloadSchema = Joi.object({
  name: Joi.string().required().min(5).max(30),
  color: Joi.string(),
});

export {
  ProjectPayloadSchema,
};
