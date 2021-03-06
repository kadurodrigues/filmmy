const Joi = require('@hapi/joi');

const userValidation = user => {
  const schema = Joi.object({
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().max(255).min(8).email().required(),
    password: Joi.string().max(1024).min(6).required()
  });

  return schema.validate(user);
}

const listValidation = list => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().max(255).required(),
  });

  return schema.validate(list)
}

module.exports = {
  userValidation,
  listValidation
};
