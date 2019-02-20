
const app = require('./app/app');

const { PORT = 4000 } = process.env;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening on port ${PORT}`);
});

module.exports = server;
