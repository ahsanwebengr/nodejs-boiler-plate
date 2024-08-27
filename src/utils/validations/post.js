import Joi from 'joi';

const PostSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Title is required',
    'string.min': 'Title should have at least 3 characters',
    'string.max': 'Title should have at most 30 characters',
  }),

  description: Joi.string().required().messages({
    'any.required': 'Description is required',
  }),

  userId: Joi.string().required().messages({
    'any.required': 'User id is required',
  }),
});

export { PostSchema };
