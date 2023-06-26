import { v4 as uuidv4 } from 'uuid';
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

router.get('/', (req,res) => {
    return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageid', (req,res) => {
    return res.send(req.context.models.messages[req.params.messageid]);
});

router.post('/', (req,res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.body.userId,
    };
    req.context.models.messages[id] = message;

    return res.send(message);
});

router.delete('/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages;

    req.context.models.messages = otherMessages;

    return res.send(message);
});

export default router;