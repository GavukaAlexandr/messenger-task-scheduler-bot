import { Router } from 'express';
import controller from './messenger.controller';

let router = new Router();

router.get('/webhook', controller.verifyToken);
router.post('/webhook', controller.registerWebhookEvents);

module.exports = router;
