import Joi from 'joi';

const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(3).required().messages({
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters long'
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

  password: Joi.string().trim().required().messages({
    'string.empty': 'Password is required'
  })
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address'
  })
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address'
  }),
  newPassword: Joi.string()
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

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().trim().required().messages({
    'string.empty': 'Current password is required'
  }),
  newPassword: Joi.string()
    .trim()
    .min(8)
    .max(128)
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])')
    )
    .required()
    .messages({
      'string.empty': 'New password is required',
      'string.min': 'New password must be at least 8 characters long',
      'string.max': 'New password must not exceed 128 characters',
      'string.pattern.base':
        'New password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address'
  }),
  otp: Joi.string().length(6).pattern(/^\d+$/).required().messages({
    'string.empty': 'OTP is required',
    'string.length': 'OTP must be exactly 6 digits',
    'string.pattern.base': 'OTP must contain only numbers'
  })
});

export {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  verifyEmailSchema
};
