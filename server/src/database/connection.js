import mongoose from 'mongoose';
import { DB_URL } from '../app/appConstants';
import mongoConfig from './mongoConfig';

// TODO: handle the error, when database is not able to connect,--
//  --send a mail to dev team, when database fails to get connect.
mongoose.connect(DB_URL, mongoConfig, (err) => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB');
});

export default mongoose;
