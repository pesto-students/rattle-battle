
import mongoose from 'mongoose';

const { DB_URL } = process.env;

mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });

export default mongoose;
