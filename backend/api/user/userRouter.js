const express = require('express');
const router = express.Router();

// ✅ userController를 불러오는 코드 추가
const userController = require('./userController');

// 📌 예시 라우팅
router.get('/profile/:userId', userController.getUserProfile);

module.exports = router;