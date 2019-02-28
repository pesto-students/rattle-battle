import mongoose from 'mongoose';
import { DB_URL } from '../app/appConstants';
import mongoConfig from './mongoConfig';

mongoose.connect(DB_URL, mongoConfig);

export default mongoose;
