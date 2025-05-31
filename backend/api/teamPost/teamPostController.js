const { TeamPost,TeamMatch, User } = require('../../models');
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
// ✅ 특정 유저를 팀원으로 확정 (confirmedUserId 저장)
const confirmTeamMember = async (req, res) => {
  console.log('👉 req.body:', req.body); 
  try {
    const { teamPostId } = req.params; // ✅ 여기를 수정
    const { userId } = req.body;
    const requesterId = req.user.userId;

    const teamPost = await TeamPost.findByPk(teamPostId);
    if (!teamPost) {
      return res.status(404).json({ error: '팀 모집 게시글이 존재하지 않습니다.' });
    }

    if (teamPost.authorUserId !== requesterId) {
      return res.status(403).json({ error: '권한이 없습니다.' });
    }

    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ error: '해당 유저를 찾을 수 없습니다.' });
    }

    teamPost.confirmedUserId = userId;
    await teamPost.save();

    return res.status(200).json({
      message: '팀원이 확정되었습니다.',
      teamPostId,
      confirmedUserId: userId
    });

  } catch (err) {
    console.error('❌ confirmTeamMember error:', err);
    return res.status(500).json({ error: '팀원 확정 중 오류가 발생했습니다.' });
  }
};

// ✅ 특정 팀 모집글의 확정된 팀원들 조회
const getConfirmedMembers = async (req, res) => {
  const { teamPostId } = req.params;

  try {
    // 해당 게시글에 매칭된 유저들 찾기
    const matches = await TeamMatch.findAll({
      where: { teamPostId },
      include: [{
        model: User,
        attributes: ['userId', 'name', 'school', 'grade', 'major', 'interests', 'role']
      }]
    });

    // 유저 정보만 추출
    const confirmedUsers = matches.map(match => match.User);

    res.status(200).json({
      message: '확정된 팀원 목록',
      members: confirmedUsers
    });
  } catch (err) {
    console.error('❌ getConfirmedMembers error:', err);
    res.status(500).json({ error: '확정된 팀원 조회 중 오류 발생' });
  }
};

// ✅ 사용자에게 적합한 팀 모집 게시글 필터링
const getMatchedTeamPosts = async (req, res) => {
  try {
    const { role, interests } = req.user;
    console.log('🧑 사용자 정보:', { role, interests });

    // ✅ getter 함수가 적용되도록 raw: false (기본값)
    const allPosts = await TeamPost.findAll({ raw: false });

    // 필터링된 게시글 리스트 생성
    const matchedPosts = allPosts.filter(post => {
      const desiredRoles = post.desiredRoles || [];
      const hashtags = post.hashtags || [];

      const roleMatch = desiredRoles.includes(role);
      const interestMatch = hashtags.some(tag => interests.includes(tag));

      console.log('🔍 게시글 비교:', {
        contestTitle: post.contestTitle,
        desiredRoles,
        hashtags,
        roleMatch,
        interestMatch
      });

      return roleMatch && interestMatch;
    });

    res.status(200).json({ matchedPosts });
  } catch (err) {
    console.error('❌ getMatchedTeamPosts error:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};
module.exports = {
  createTeamPost,
  getMyTeamPosts,
  confirmTeamMember,
  getConfirmedMembers,
  getMatchedTeamPosts
};