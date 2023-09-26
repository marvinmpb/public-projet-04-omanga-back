const joi = require('joi');

module.exports = {
  create: joi.object({
    order_date: joi.date().iso(),
    archeving_date: joi.string().iso(),
    product_quantity: joi.number().integer(),
    product_id: joi.number().integer(),
    user_id: joi.number().integer()
  }),

  update: joi.object({
    order_date: joi.date().iso(),
    archeving_date: joi.string().iso(),
    product_quantity: joi.number().integer(),
    product_id: joi.number().integer(),
    user_id: joi.number().integer()
  }),
};
