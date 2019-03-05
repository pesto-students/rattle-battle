import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '../routes/routes';
import { TRUSTED_ORIGIN } from './appConstants';

const app = express();

app.use(cors({ origin: TRUSTED_ORIGIN, exposedHeaders: ['X-Auth-Token'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

export default app;
