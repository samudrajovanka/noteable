import Joi from 'joi';

const TasksPayloadSchema = Joi.object({
  tasks: Joi.array().items(Joi.string()).required().min(1)
    .max(30),
});

export {
  TasksPayloadSchema,
};
