import Joi from 'joi';

const TasksPayloadSchema = Joi.object({
  tasks: Joi.array().items(Joi.string().min(5).max(30)).required().min(1)
    .max(30),
});

const TasksUpdatePayloadSchema = Joi.object({
  tasks: Joi.array().items(Joi.string().min(5).max(30)).max(30),
});

const TaskUpdatePayloadSchema = Joi.object({
  name: Joi.string().min(5).max(30),
  done: Joi.boolean(),
});

export {
  TasksPayloadSchema,
  TasksUpdatePayloadSchema,
  TaskUpdatePayloadSchema,
};
