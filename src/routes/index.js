const notesRouter = require('./notesRouter');

const apiPrefix = '/api/v1';

module.exports = (app) => {
  app.use(apiPrefix, notesRouter);
}
