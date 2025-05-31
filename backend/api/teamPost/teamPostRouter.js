const express = require('express');
const router = express.Router();
const { createTeamPost,getMyTeamPosts,confirmTeamMember,getMatchedTeamPosts   } = require('./teamPostController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createTeamPost);
// ✅ 내가 작성한 팀 모집 글 목록 조회
router.get('/my', authMiddleware, getMyTeamPosts);
router.patch('/:teamPostId/confirm',authMiddleware,  confirmTeamMember);
// ✅ 나에게 적합한 팀 모집 글 추천
router.get('/match', authMiddleware, getMatchedTeamPosts);

module.exports = router;


