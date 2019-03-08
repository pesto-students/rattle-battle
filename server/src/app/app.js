import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '../routes/routes';

const app = express();

app.use(cors({ origin: '*', exposedHeaders: ['X-Auth-Token'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

export default app;
