import express, {

    Request,

    Response,

    RequestHandler,

    NextFunction,

} from 'express';
import models from '../models';

const router = express.Router();

router.use((req, res, next) => {
    req.context = {
        models
    };
    next();
})

router.use(express.json());

router.get('/', (req, res) => {
    res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
    res.send(req.context.models.users[req.params.userId]);
})

router.post('/', (req, res) => {
    res.send('POST HTTP method on user resource');
});

router.put('/:userId', (req, res) => {
    res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

router.delete('/:userId', (req, res) => {
    delete req.context.models.users[req.params.userId];
    res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

export default router;