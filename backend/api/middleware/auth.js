const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '토큰이 없습니다.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ 명시적으로 필요한 필드만 추출하여 저장
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      interests: decoded.interests // 예: ["AI", "스타트업"]
    };

    next(); // ✅ 다음 미들웨어 또는 라우터로 진행
  } catch (err) {
    return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
  }
};