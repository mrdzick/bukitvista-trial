const { celebrate, Joi, Segments } = require('celebrate');

const createProductValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    category: Joi.string().valid("electronics", "jewelry", "men's clothing", "women's clothing").required(),
  }),
}, {
  abortEarly: false,
}, {
  mode: 'full',
});

module.exports = { createProductValidator };