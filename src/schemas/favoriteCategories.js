const joi = require('joi');

module.exports = {
  create: joi.object({
    user_id: joi.number().integer().required(),
    category_id: joi.number().integer().required(),
  }),

  update: joi.object({
    user_id: joi.number().integer().required(),
    category_id: joi.number().integer().required(),
  }),
};
