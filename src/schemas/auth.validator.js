import Joi from 'joi';

const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(50).required().messages({
    'string.empty': 'Full Name is required',
    'string.min': 'Full Name must be at least 3 characters long',
    'string.max': 'Full Name must not exceed 50 characters'
  }),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'email is required',
    'string.email': 'email must be a valid email address'
  }),

  password: Joi.string()
    .trim()
    .min(8)
    .max(128)
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])')
    )
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 128 characters',
      'string.pattern.base':
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address'
  }),

  password: Joi.string()
    .trim()
    .min(8)
    .max(128)
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])')
    )
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 128 characters',
      'string.pattern.base':
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
});

export { registerSchema, loginSchema };
