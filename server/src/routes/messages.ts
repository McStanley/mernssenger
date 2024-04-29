import { Router } from 'express';
import { messages_POST } from '../controllers/messages';

const router = Router();

router.post('/', messages_POST);

export default router;
