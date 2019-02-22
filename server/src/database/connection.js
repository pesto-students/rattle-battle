import mongoose from 'mongoose';
import { DB_URL } from '../app/appConstants';

mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });

export default mongoose;
