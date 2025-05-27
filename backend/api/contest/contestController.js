const axios = require('axios');
const { Contest, User } = require('../../models');

// 로그인한 유저의 관심사를 기반으로 공모전 추천
const getRecommendedContests = async (req, res) => {
  console.log('✅ getRecommendedContests called');
  try {
    const userId = req.user.userId; // JWT 토큰에서 디코딩된 userId

    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    const interests = user.interests; // 배열로 JSON 파싱된 상태
    const userRole = user.role;
    const contests = await Contest.findAll();
    const filteredContests = contests.filter(contest =>
      contest.tags?.some(tag => interests.includes(tag)) &&
      contest.requiredRoles?.includes(userRole)
    );

    res.status(200).json(filteredContests);
  } catch (err) {
    console.error('getRecommendedContests error:', err);
    res.status(500).json({ error: '추천 공모전 조회 중 오류 발생' });
  }
};

const getMatchedUsers = async (req, res) => {
  try {
    const contestId = req.params.contestId;

    const contest = await Contest.findByPk(contestId);
    if (!contest) return res.status(404).json({ error: '공모전이 존재하지 않습니다.' });

    const { requiredRoles, tags } = contest;

    const users = await User.findAll({
      attributes: ['userId', 'name', 'role', 'interests'],
    });

    const matchedUsers = users.filter(user => {
      const roleMatch = requiredRoles.includes(user.role);
      const interestMatch = user.interests.some(interest => tags.includes(interest));
      return roleMatch && interestMatch;
    });

    res.status(200).json(matchedUsers);
  } catch (err) {
    console.error('getMatchedUsers error:', err);
    res.status(500).json({ error: '추천 사용자 조회 중 오류 발생' });
  }
};

const getRelatedWinningProjects = async (req, res) => {
  console.log('🎯 getRelatedWinningProjects 함수 실행');
  try {
    const contestId = req.params.contestId;
    console.log('✅ [GET] /contests/:contestId/related-wins 요청 진입');
    console.log('➡️  요청 파라미터:', req.params);
    console.log('🔍 공모전 ID 확인:', contestId);

    const contest = await Contest.findByPk(contestId);
    if (!contest) {
      return res.status(404).json({ error: '공모전이 존재하지 않습니다.' });
    }

    const tags = contest.tags;
    if (!Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ error: '공모전 태그가 존재하지 않습니다.' });
    }

    const tagString = tags.join(',');
    console.log('🎯 추천 기준 태그 문자열:', tagString);

    console.log('🚀 외부 유사도 추천 서버에 요청 보냄...');
    const response = await axios.post(
      'http://jeongwoo-kim-web.myds.me:8000/simliarity_engine/',
      { target_idea: tagString }
    );

    const data = response.data;

    if (!Array.isArray(data)) {
      return res.status(502).json({ error: '외부 서버 응답 형식이 올바르지 않습니다.' });
    }

    const results = data.map(item => ({
      score: item.similarity,
      text: item.target_text,
      points: item.how_similar.similarity_points.map(p => p.similar_point_from_B)
    }));

    console.log('✅ 외부 서버 응답 파싱 완료');

    return res.status(200).json({
      tag_used: tagString,
      results
    });
  } catch (err) {
    console.error('❌ getRelatedWinningProjects error:', err.message || err);
    return res.status(500).json({ error: '관련 수상작 조회 중 오류 발생' });
  }
};
const getRelatedWinsByIdea = async (req, res) => {
  console.log('🎯 getRelatedWinsByIdea 함수 실행');
  try {
    const idea = req.query.idea;

    if (!idea) {
      return res.status(400).json({ error: 'idea 쿼리 파라미터가 필요합니다.' });
    }

    console.log('📥 사용자 입력 아이디어:', idea);
    console.log('🚀 외부 서버에 POST 요청 보냄...');

    const response = await axios.post(
      'http://jeongwoo-kim-web.myds.me:8000/simliarity_engine/',
      { target_idea: idea }
    );

    const data = response.data;

    if (!Array.isArray(data)) {
      return res.status(502).json({ error: '외부 서버 응답 형식이 잘못되었습니다.' });
    }

    const results = data.map(item => ({
      score: item.similarity,
      text: item.target_text,
      points: item.how_similar?.similarity_points?.map(p => p.similar_point_from_B) || []
    }));

    console.log('✅ 관련 수상작 응답 수신 완료');

    return res.status(200).json({
      input: idea,
      results
    });

  } catch (err) {
    console.error('❌ getRelatedWinsByIdea error:', err.message || err);
    return res.status(500).json({ error: '관련 수상작 조회 중 오류 발생' });
  }
};

module.exports = {
  getRecommendedContests,
  getMatchedUsers,
  getRelatedWinningProjects,
  getRelatedWinsByIdea,
};
