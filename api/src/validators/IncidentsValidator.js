const { celebrate, Segments, Joi } = require('celebrate');

const page = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
});

const id = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

const incident = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number()
      .required()
      .min(0),
  }),
});

module.exports = {
  page,
  id,
  incident,
};
