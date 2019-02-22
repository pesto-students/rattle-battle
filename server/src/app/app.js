import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import router from '../routes/routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

export default app;
