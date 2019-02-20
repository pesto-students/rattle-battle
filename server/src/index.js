
import app from './app/app';
import './database/connection';

const { PORT = 4000 } = process.env;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening on port ${PORT}`);
});

export default server;
