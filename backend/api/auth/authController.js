const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const signup = async (req, res) => {
  try {
    const { email, userId, password, name, school, grade, major, interests, role } = req.body;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

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
    });

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: {
        userId: newUser.userId,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (err) {
    console.error('signup error:', err);
    res.status(500).json({ error: '회원가입 중 에러 발생' });
  }
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


const login = async (req, res) => {
  try {
    const { email, userId, password } = req.body;

    // 유저 존재 확인 (email + userId 조합으로 찾기)
    const user = await User.findOne({ where: { email, userId } });
    if (!user) {
      return res.status(401).json({ error: '존재하지 않는 사용자입니다.' });
    }

    // 비밀번호 검증
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // JWT 토큰 발급
    const token = jwt.sign(
      {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '3h' } // 유효기간 3시간
    );

    res.status(200).json({
      message: '로그인 성공',
      token,
      user: {
        userId: user.userId,
        name: user.name,
      },
    });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
  }
};

module.exports = { signup,login };
