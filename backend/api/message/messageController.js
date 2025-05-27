// api/message/messageController.js
const axios = require('axios');
const { Message ,TeamPost } = require('../../models');

const sendMessage = async (req, res) => {
  try {
    console.log('📩 [POST] /messages 요청 도착');
    const { teamPostId, content } = req.body;
    const senderUserId = req.user.userId;

    const newMessage = await Message.create({
      teamPostId,
      senderUserId,
      content,
    });

    res.status(201).json({
      message: '쪽지 전송 성공',
      data: newMessage,
    });
  } catch (err) {
    console.error('❌ sendMessage error:', err);
    res.status(500).json({ error: '쪽지 전송 중 오류 발생' });
  }
};


// ✅ 2. 특정 팀 모집 글에 온 쪽지들 조회
const getMessagesByTeamPostId = async (req, res) => {
  try {
    const userId = req.user.userId;
    const teamPostId = req.params.teamPostId;
    console.log(`📬 [GET] /messages/${teamPostId} 요청 - 사용자:`, userId);

    // 1️⃣ 해당 팀 모집 글이 로그인한 사용자의 것인지 확인
    const post = await TeamPost.findOne({
      where: { id: teamPostId, authorUserId: userId }
    });

    if (!post) {
      return res.status(403).json({ error: '접근 권한이 없습니다.' });
    }

    // 2️⃣ 쪽지들 조회
    const messages = await Message.findAll({
      where: { teamPostId },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      message: '해당 게시글에 온 쪽지 목록',
      messages
    });
  } catch (err) {
    console.error('❌ getMessagesByTeamPostId error:', err);
    res.status(500).json({ error: '쪽지 조회 중 오류 발생' });
  }
};
module.exports = {
  sendMessage,
  getMessagesByTeamPostId
};
