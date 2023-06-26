import { v4 as uuidv4 } from 'uuid';
import express, {

    Request,

    Response,

    RequestHandler,

    NextFunction,

} from 'express';
import models from '../models';

const router = express.Router();

router.use(express.json());

router.use((req, res, next) => {
    req.context = {
        models
    };
    next();
})


router.get('/', (req,res) => {
    res.send(Object.values(req.context.models.quotes));
});

router.get('/:quoteId', (req, res) => {
    res.send(req.context.models.quotes[req.params.quoteId]);
});

router.post('/', (req, res) => {
    const id = uuidv4();
    const quote = {
        id,
        quote: req.body.quote,
        author: req.body.author,
        year: req.body.year,
    };
    req.context.models.quotes[id] = quote;

    return res.send(quote);
});

export default router;