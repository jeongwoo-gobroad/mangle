// api/message/messageRouter.js
const express = require('express');
const router = express.Router();
const { sendMessage,getMessagesByTeamPostId} = require('./messageController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, sendMessage);
// ✅ 특정 팀 모집 글에 온 쪽지 조회
router.get('/:teamPostId', authMiddleware, getMessagesByTeamPostId);
module.exports = router;


