const { celebrate, Segments, Joi } = require('celebrate');

const id = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string()
      .required()
      .length(8),
  }),
});

const authorization = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string()
      .required()
      .length(8),
  }).unknown(),
});

module.exports = {
  id,
  authorization,
};
