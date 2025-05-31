const { User } = require('../../models');

const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({
      where: { userId },
      attributes: ['userId', 'name', 'school', 'grade', 'major', 'role', 'interests', 'stats']
    });

    if (!user) {
      return res.status(404).json({ error: '해당 사용자를 찾을 수 없습니다.' });
    }

    // interests가 JSON 문자열일 경우 파싱
    const parsedInterests = typeof user.interests === 'string'
      ? JSON.parse(user.interests)
      : user.interests;

    res.status(200).json({
      message: '사용자 프로필 조회 성공',
      profile: {
        userId: user.userId,
        name: user.name,
        school: user.school,
        grade: user.grade,
        major: user.major,
        interests: parsedInterests,
        role: user.role,
        stats: user.stats // ✅ 스탯도 응답에 포함
      }
    });
  } catch (err) {
    console.error('❌ getUserProfile error:', err);
    res.status(500).json({ error: '서버 오류로 프로필 조회 실패' });
  }
};

module.exports = {
  getUserProfile
};
