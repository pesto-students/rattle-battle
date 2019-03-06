import mongoose from 'mongoose';
import { DB_URL } from '../app/appConstants';
import mongoConfig from './mongoConfig';

// TODO: handle the error, when database is not able to connect,--
//  --send a mail to dev team, when database fails to get connect.
mongoose.connect(DB_URL, mongoConfig);

export default mongoose;
