import Joi from 'joi';

const UserValidation = Joi.object({
  username: Joi.string()
    .pattern(/^[a-z0-9_]+$/, 'lowercase alphanumeric with underscore')
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.pattern.base':
        'Username can only contain lowercase letters, numbers, and underscores',
      'any.required': 'Username is required',
      'string.min': 'Username should have at least 3 characters',
      'string.max': 'Username should have at most 30 characters',
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid Email Format',
      'any.required': 'Email is required',
    }),

  fullName: Joi.string().min(3).max(50).required().messages({
    'any.required': 'Full Name is required',
    'string.min': 'Full Name should have at least 3 characters',
    'string.max': 'Full Name should have at most 50 characters',
  }),

  avatar: Joi.string().uri().required().messages({
    'string.uri': 'Enter a valid URL',
    'any.required': 'Avatar is required',
  }),

  password: Joi.string()
    .pattern(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'password'
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character',
      'any.required': 'Password is required',
    }),

  coverImage: Joi.string().uri().optional(),
  refreshToken: Joi.string().optional(),
  posts: Joi.array().items(Joi.string()).optional(),
});

export default UserValidation;
