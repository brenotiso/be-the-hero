const express = require('express');

const OngValidator = require('./validators/OngValidator');
const IncidentsValidator = require('./validators/IncidentsValidator');
const SessionValidator = require('./validators/SessionValidator');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionValidator.id, SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngValidator.ong, OngController.create);

routes.get('/profile', SessionValidator.authorization, ProfileController.index);

routes.get('/incidents', IncidentsValidator.page, IncidentController.index);
routes.post(
  '/incidents',
  SessionValidator.authorization,
  IncidentsValidator.incident,
  IncidentController.create,
);
routes.delete(
  '/incidents/:id',
  SessionValidator.authorization,
  IncidentsValidator.id,
  IncidentController.delete,
);

module.exports = routes;
