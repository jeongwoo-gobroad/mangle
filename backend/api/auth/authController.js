const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const signup = async (req, res) => {
  try {
    // 🔍 프론트에서 보낸 데이터 로그
    console.log("📥 [signup] 요청 바디:", req.body);
    const { email, userId, password, name, school, grade, major, interests, role, stats } = req.body;
      // 🔍 필수 필드 체크 로그
    if (!email || !userId || !password) {
      console.warn("⚠️ [signup] 필수 필드 누락:", { email, userId, password });
    }
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
     // 🔍 User.create 전 데이터 확인
    console.log("🛠 [signup] 저장할 사용자:", {
      email, userId, hashedPassword, name, school, grade, major, interests, role
    });
    // User 생성
    const newUser = await User.create({
      email,
      userId,
      password: hashedPassword,
      name,
      school,
      grade,
      major,
      interests,
      role, // 배열로 받은 것 → model에서 JSON으로 자동 처리
      stats,
    });
     // ✅ 성공 응답
    console.log("✅ [signup] 회원가입 성공:", newUser.userId);

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: {
        userId: newUser.userId,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (err) {
    // ❌ 에러 출력
    console.error('❌ [signup] 에러 발생:', err);
    res.status(500).json({ error: '회원가입 중 에러 발생' });
  }
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


const login = async (req, res) => {
  try {
    const { email, userId, password } = req.body;
    // 🔍 프론트에서 보낸 로그인 정보
    console.log("📥 [login] 요청 바디:", req.body);

    // ✅ 유저 존재 확인 (email + userId 조합으로 조회)
    const user = await User.findOne({
      where: { email, userId },
      attributes: ['userId', 'name', 'email', 'password', 'role', 'interests'] // 🔥 핵심 추가
    });
    if (!user) {
      return res.status(401).json({ error: '존재하지 않는 사용자입니다.' });
    }

    // ✅ 비밀번호 검증
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }
    // ✅ interests가 문자열이면 배열로 변환
    const interests = typeof user.interests === 'string'
      ? JSON.parse(user.interests)
      : user.interests;

    // ✅ JWT 토큰 발급: role, interests 포함
    const token = jwt.sign(
      {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,           // 🔥 포함
        interests: interests       // 🔥 포함
      },
      JWT_SECRET,
      { expiresIn: '3h' } // 유효기간 3시간
    );

      // ✅ 로그인 성공 로그
    console.log("✅ [login] 로그인 성공:", user.userId);

     // ✅ 응답 반환
    res.status(200).json({
      message: '로그인 성공',
      token,
      user: {
        userId: user.userId,
        name: user.name,
        role: user.role,
        interests: interests
      },
    });
  } catch (err) {
    // ❌ 로그인 에러
    console.error('❌ [login] 에러 발생:', err);
    res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
  }
};

module.exports = { signup,login };