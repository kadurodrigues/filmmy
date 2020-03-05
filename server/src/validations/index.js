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

const addMovieValidation = data => {
  const schema = Joi.object({
    listId: Joi.string().required(),
    // movie: {
    //   id: Joi.number().required(),
    //   title: Joi.string().max(255).required(),
    //   overview: Joi.string().required(),
    //   backdrop_path: Joi.string().required(),
    //   genres: Joi.array().min(1).required()
    // }
  });

  return schema.validate(data)
}

const removeMovieValidation = data => {
  const schema = Joi.object({
    listId: Joi.string().required(),
    movieId: Joi.string().required()
  });

  return schema.validate(data)
}

const removeListValidation = list => {
  const schema = Joi.object({
    listId: Joi.string().required(),
  });

  return schema.validate(list)
}

module.exports = {
  userValidation,
  listValidation,
  addMovieValidation,
  removeMovieValidation,
  removeListValidation
};
