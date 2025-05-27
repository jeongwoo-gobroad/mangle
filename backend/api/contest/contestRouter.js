
console.log('✅ contestRouter loaded');
const express = require('express');
const router = express.Router();
const contestController = require('./contestController');
const authMiddleware = require('../middleware/auth'); // JWT 인증 미들웨어

// 관심사 기반 공모전 추천
router.get('/recommend', authMiddleware, contestController.getRecommendedContests);
// ✅ 공모전 기준으로 유저 매칭
router.get('/:contestId/match-users', authMiddleware, contestController.getMatchedUsers);
router.get('/:contestId/related-wins',contestController.getRelatedWinningProjects);
router.get('/related-wins', contestController.getRelatedWinsByIdea);
module.exports = router;
