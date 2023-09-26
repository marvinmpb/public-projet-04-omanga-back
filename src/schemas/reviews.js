const joi = require('joi');

module.exports = {
  create: joi.object({
    created_at: joi.date().iso(),
    content: joi.string().max(500).required(),
    published: joi.boolean().default(false),
    rating: joi.number().integer().min(0).max(5).required(),
    user_id: joi.number().integer().required(),
    product_id: joi.number().integer().required(),
  }),

  update: joi.object({
    order_date: joi.date().iso(),
    archeving_date: joi.string().iso(),
    product_quantity: joi.number().integer(),
    product_id: joi.number().integer(),
    user_id: joi.number().integer()
  }),
};
