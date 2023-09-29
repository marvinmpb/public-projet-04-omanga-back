const joi = require('joi');

module.exports = {
  create: joi.object({
    stock: joi.number().integer(),
    name: joi.string().max(255).required(),
    description: joi.string().max(500),
    image_url: joi.string().max(255).required(),
    price: joi.number().required(),
    category_id: joi.number().integer(),
    universe_id: joi.number().integer(),
  }),

  update: joi.object({
    stock: joi.number().integer(),
    name: joi.string().max(255),
    description: joi.string().max(500),
    image_url: joi.string().max(255),
    price: joi.number(),
    category_id: joi.number().integer(),
    universe_id: joi.number().integer(),
  }),
};
