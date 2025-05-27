const { TeamPost } = require('../../models');
const { Op } = require('sequelize');

// ✅ 팀 모집 게시글 생성
const createTeamPost = async (req, res) => {
  try {
    // 🔍 요청 도착 확인 로그
    console.log('📥 [POST] /teamposts 요청 도착');
    
    // 🔍 사용자 정보 확인
    console.log('👤 요청한 사용자 정보:', req.user);

    const { contestTitle, desiredRoles, description, hashtags } = req.body;

    // 🔍 요청 본문 확인
    console.log('📦 요청 body:', req.body);

    const authorUserId = req.user.userId;

    const existing = await TeamPost.findOne({
      where: {
        authorUserId,
        contestTitle
      }
    });
    if (existing) {
      return res.status(400).json({ error: '이미 해당 공모전에 대해 작성한 게시글이 존재합니다.' });
    }

    // 🔨 DB에 새 TeamPost 생성
    const newPost = await TeamPost.create({
      contestTitle,
      authorUserId,
      desiredRoles,
      description,
      hashtags
    });

    // ✅ 성공 로그
    console.log('✅ 팀 모집 게시글 생성 완료:', newPost);

    // 🔁 응답 반환
    res.status(201).json({
      message: '팀 모집 게시글 생성 성공',
      teamPost: newPost
    });
  } catch (err) {
    // ❌ 에러 처리
    console.error('❌ createTeamPost error:', err);
    res.status(500).json({ error: '팀 모집 게시글 생성 중 오류 발생' });
  }
};

// ✅ 1. 내가 작성한 팀 모집 글 목록 조회
const getMyTeamPosts = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log('📄 [GET] /teamposts/my 요청 - 사용자:', userId);

    const posts = await TeamPost.findAll({
      where: { authorUserId: userId },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      message: '내가 작성한 팀 모집 글 목록',
      posts
    });
  } catch (err) {
    console.error('❌ getMyTeamPosts error:', err);
    res.status(500).json({ error: '내 팀 모집 글 조회 중 오류 발생' });
  }
};

module.exports = {
  createTeamPost,
  getMyTeamPosts,
};