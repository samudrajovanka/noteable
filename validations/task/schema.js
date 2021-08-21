import Joi from 'joi';

const TasksPayloadSchema = Joi.object({
  tasks: Joi.array().items(Joi.string()).required().min(1)
    .max(30),
});

const TasksUpdatePayloadSchema = Joi.object({
  tasks: Joi.array().items(Joi.string()).max(30),
});

const TaskUpdatePayloadSchema = Joi.object({
  name: Joi.string(),
  done: Joi.boolean(),
});

export {
  TasksPayloadSchema,
  TasksUpdatePayloadSchema,
  TaskUpdatePayloadSchema,
};
