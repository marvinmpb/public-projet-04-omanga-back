const joi = require('joi');

module.exports = {
  create: joi.object({
    name: joi.string().required(),
    image_url: joi.string(),
    products: joi.array(),
    favorite_categories: joi.array(),
  }).min(1).max(4).required(),

  update: joi.object({
    name: joi.string(),
    image_url: joi.string(),
    products: joi.array(),
    favorite_categories: joi.array(),
  }).min(1).max(4).required(),
};
