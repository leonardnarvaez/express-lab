import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser, { json } from 'body-parser';
import models from './src/models';
import routes from './src/routes';

const app = express();
app.use(cors());

app.use('/users', routes.user);
app.use('/messages', routes.message)
app.use('/quotes', routes.quotes);
 
app.use((req, res, next) => {
    req.context = {
        models
    };
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));

app.listen(3000, () => {
    console.log(process.env.ENVIRONMENT);
    console.log('Example app listening on port 3000!');
});

app.use((req,res,next) => {
    req.serverMessage = 'server generated message';
    next();
})