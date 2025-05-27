const { User, sequelize } = require('../models');
const bcrypt = require('bcrypt');

const seedUsers = async () => {
  await sequelize.sync();
  
  await User.destroy({ where: {}, truncate: true });

  const hashedPassword = await bcrypt.hash('password123', 10);

  const userList =[
    { email: 'user1@example.com', userId: 'user1', password: hashedPassword, name: '유저1', school: '가상대학교', grade: 3, major: '컴퓨터공학', interests: ['창업', '기후', 'AI'], role: '프론트엔드' },
    { email: 'user2@example.com', userId: 'user2', password: hashedPassword, name: '유저2', school: '가상대학교', grade: 1, major: '데이터사이언스', interests: ['데이터', '마케팅', '환경'], role: '데이터 분석가' },
    { email: 'user3@example.com', userId: 'user3', password: hashedPassword, name: '유저3', school: '가상대학교', grade: 3, major: '디자인', interests: ['창업', '모바일', '스타트업', '환경'], role: '데이터 분석가' },
    { email: 'user4@example.com', userId: 'user4', password: hashedPassword, name: '유저4', school: '가상대학교', grade: 2, major: '컴퓨터공학', interests: ['마케팅', '환경', '데이터'], role: 'AI 엔지니어' },
    { email: 'user5@example.com', userId: 'user5', password: hashedPassword, name: '유저5', school: '가상대학교', grade: 4, major: '디자인', interests: ['모바일', 'AI'], role: '백엔드' },
    { email: 'user6@example.com', userId: 'user6', password: hashedPassword, name: '유저6', school: '가상대학교', grade: 1, major: '전자공학', interests: ['기획', 'AI'], role: '데이터 분석가' },
    { email: 'user7@example.com', userId: 'user7', password: hashedPassword, name: '유저7', school: '가상대학교', grade: 3, major: '경영학', interests: ['창업', '기후', '마케팅', '데이터'], role: '데이터 분석가' },
    { email: 'user8@example.com', userId: 'user8', password: hashedPassword, name: '유저8', school: '가상대학교', grade: 2, major: '전자공학', interests: ['창업', 'AI', '마케팅'], role: '기획자' },
    { email: 'user9@example.com', userId: 'user9', password: hashedPassword, name: '유저9', school: '가상대학교', grade: 3, major: '데이터사이언스', interests: ['UX', '기획'], role: '데이터 분석가' },
    { email: 'user10@example.com', userId: 'user10', password: hashedPassword, name: '유저10', school: '가상대학교', grade: 1, major: '데이터사이언스', interests: ['AI', '기획', '창업'], role: '기획자' },
    { email: 'user11@example.com', userId: 'user11', password: hashedPassword, name: '유저11', school: '가상대학교', grade: 1, major: '전자공학', interests: ['기획', '마케팅'], role: '백엔드' },
    { email: 'user12@example.com', userId: 'user12', password: hashedPassword, name: '유저12', school: '가상대학교', grade: 4, major: '데이터사이언스', interests: ['데이터', '모바일', '환경', '창업'], role: '마케터' },
    { email: 'user13@example.com', userId: 'user13', password: hashedPassword, name: '유저13', school: '가상대학교', grade: 3, major: '데이터사이언스', interests: ['환경', '스타트업'], role: '디자이너' },
    { email: 'user14@example.com', userId: 'user14', password: hashedPassword, name: '유저14', school: '가상대학교', grade: 1, major: '경영학', interests: ['스타트업', '창업'], role: 'AI 엔지니어' },
    { email: 'user15@example.com', userId: 'user15', password: hashedPassword, name: '유저15', school: '가상대학교', grade: 3, major: '경영학', interests: ['마케팅', '기후'], role: '기획자' },
    { email: 'user16@example.com', userId: 'user16', password: hashedPassword, name: '유저16', school: '가상대학교', grade: 3, major: '데이터사이언스', interests: ['모바일', 'AI', '마케팅', '데이터'], role: 'AI 엔지니어' },
    { email: 'user17@example.com', userId: 'user17', password: hashedPassword, name: '유저17', school: '가상대학교', grade: 4, major: '경영학', interests: ['스타트업', '모바일', '데이터', '마케팅'], role: 'AI 엔지니어' },
    { email: 'user18@example.com', userId: 'user18', password: hashedPassword, name: '유저18', school: '가상대학교', grade: 1, major: '데이터사이언스', interests: ['UX', '마케팅', '기획'], role: '기획자' },
    { email: 'user19@example.com', userId: 'user19', password: hashedPassword, name: '유저19', school: '가상대학교', grade: 4, major: '데이터사이언스', interests: ['스타트업', '창업'], role: '마케터' },
    { email: 'user20@example.com', userId: 'user20', password: hashedPassword, name: '유저20', school: '가상대학교', grade: 4, major: '전자공학', interests: ['데이터', '기획', '스타트업'], role: '마케터' }
  ];
  await User.bulkCreate(userList, {
    ignoreDuplicates: true // 중복된 데이터는 생략하고 삽입
  });
  console.log('✅ 더미 사용자 20명 삽입 완료');
  process.exit();
};

seedUsers();