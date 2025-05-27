const express = require('express');
const router = express.Router();
const { createTeamPost,getMyTeamPosts } = require('./teamPostController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createTeamPost);
// ✅ 내가 작성한 팀 모집 글 목록 조회
router.get('/my', authMiddleware, getMyTeamPosts);
module.exports = router;


