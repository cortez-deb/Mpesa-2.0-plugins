import Express from 'express';
import cors from 'cors';
import 'dotenv/config';
import route from '../src/routes/Mpesa_auth/index.js'; 
import route_qr from '../src/routes/Mpesa_Dynamic_qr/index.js'
import route_stk from '../src/routes/M-Express/index.js'
import b2croute from '../src/routes/M-B2c/index.js'
const app = Express();
/**
 * Consfigure the cores to accept requests from defined IPs and domains
 */
app.use(
  cors({
    origin: ['http://localhost:3000' /**Add more domains to the allowed list */],
    credentials: true,
  })
);
/**
 * @description
 * Configure your application to use json
 */
app.use(Express.json());

/** 
 * @description 
 * Configure your api routes here
 * 
 * @requires
 * @param {*} req 
 * @param {*} res 
 * **/
const api_version = `/api/v1`;
app.get('/', (req, res) => res.send('Welcome to the Mpesa APIs Microservice'));
app.use(`${api_version}`, route);
app.use(`${api_version}`, route_qr);
app.use(`${api_version}`, route_stk);
app.use(`${api_version}`, b2croute);


export default app;