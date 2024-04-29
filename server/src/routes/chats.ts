import { Router } from 'express';
import { chats_POST, messages_GET } from '../controllers/chats';

const router = Router();

router.post('/', chats_POST);

router.get('/:chatID/messages', messages_GET);

export default router;
