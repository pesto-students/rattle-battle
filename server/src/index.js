import app from './app/app';
import './database/connection';
import { PORT } from './app/appConstants';

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening on port ${PORT}`);
});

export default server;
