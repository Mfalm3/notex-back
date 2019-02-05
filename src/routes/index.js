const authRouter = require('./authRouter');
const notesRouter = require('./notesRouter');

const apiPrefix = '/api/v1';

module.exports = (app) => {
  app.use(apiPrefix, authRouter);
  app.use(apiPrefix, notesRouter);
}
