import { Router } from 'express';
import { userChats_GET, users_GET } from '../controllers/users';

const router = Router();

router.get('/', users_GET);

router.get('/:userID/chats', userChats_GET);

export default router;
