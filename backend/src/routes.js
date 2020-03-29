const express = require('express');
const { Segments , Joi , celebrate } = require('celebrate');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}) , SessionController.create);

routes.get('/ongs', ongController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), ongController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS] : Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}),ProfileController.index);

routes.get('/incidents', celebrate({
  [Segments.QUERY] : Joi.object().keys({
    page: Joi.number(),
  })
}) ,incidentController .index);


routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required().min(0)
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}) , incidentController.create);


routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}),incidentController.delete);

module.exports = routes;