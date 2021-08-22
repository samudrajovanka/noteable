import Joi from 'joi';

const UserPayloadSchema = Joi.object({
  fullname: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(100),
});

export {
  UserPayloadSchema,
};
