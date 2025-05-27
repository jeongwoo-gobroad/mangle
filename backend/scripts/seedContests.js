const { Contest, sequelize } = require('../models');

const seedContests = async () => {
  await sequelize.sync(); // 테이블 생성 보장
  // 기존 데이터 전체 삭제 (필요시 유지)
  await Contest.destroy({ where: {}, truncate: true });

  const contestList = [
    {
      title: 'AI 해커톤 2025',
      description: '인공지능을 활용한 아이디어 경진대회',
      tags: ['AI', '해커톤'],
      requiredRoles: ['프론트엔드', '백엔드', '디자이너'],
      startDate: new Date('2025-05-24'),
      endDate: new Date('2025-06-23'),
    },
    {
      title: '창업 아이디어 공모전',
      description: '창의적인 스타트업 아이템을 제안하세요!',
      tags: ['창업', '기획'],
      requiredRoles: ['기획자', '마케터'],
      startDate: new Date('2025-05-27'),
      endDate: new Date('2025-06-26'),
    },
    {
      title: 'UX/UI 디자인 챌린지',
      description: '사용자 경험에 초점을 맞춘 디자인 공모전',
      tags: ['디자인', 'UX'],
      requiredRoles: ['디자이너'],
      startDate: new Date('2025-05-30'),
      endDate: new Date('2025-06-29'),
    },
    {
      title: '데이터 분석 경진대회',
      description: '빅데이터를 분석하고 인사이트를 도출하세요!',
      tags: ['데이터', 'AI'],
      requiredRoles: ['데이터 분석가', '백엔드'],
      startDate: new Date('2025-06-02'),
      endDate: new Date('2025-07-02'),
    },
    {
      title: '친환경 기술 아이디어 공모전',
      description: '지속 가능한 기술을 제안해주세요.',
      tags: ['환경', '기술'],
      requiredRoles: ['기획자', '프론트엔드'],
      startDate: new Date('2025-06-05'),
      endDate: new Date('2025-07-05'),
    },
    {
      title: '모바일 앱 UX 해커톤',
      description: '사용자 중심의 모바일 앱을 설계하세요.',
      tags: ['UX', '모바일'],
      requiredRoles: ['디자이너', '프론트엔드'],
      startDate: new Date('2025-06-08'),
      endDate: new Date('2025-07-08'),
    },
    {
      title: 'AI 기반 마케팅 챌린지',
      description: 'AI를 활용한 새로운 마케팅 전략 제안',
      tags: ['AI', '마케팅'],
      requiredRoles: ['마케터', 'AI 엔지니어'],
      startDate: new Date('2025-06-11'),
      endDate: new Date('2025-07-11'),
    },
    {
      title: '웹 풀스택 해커톤',
      description: '프론트와 백을 모두 아우르는 팀 프로젝트',
      tags: ['웹', '풀스택'],
      requiredRoles: ['프론트엔드', '백엔드'],
      startDate: new Date('2025-06-14'),
      endDate: new Date('2025-07-14'),
    },
    {
      title: '교육 혁신 아이디어 공모전',
      description: '미래 교육을 위한 새로운 아이디어 제안',
      tags: ['교육', '혁신'],
      requiredRoles: ['기획자', '디자이너'],
      startDate: new Date('2025-06-17'),
      endDate: new Date('2025-07-17'),
    },
    {
      title: '로컬 문제 해결 프로젝트',
      description: '지역 사회 문제를 창의적으로 해결해보세요.',
      tags: ['사회', '문제해결'],
      requiredRoles: ['기획자', '프론트엔드', '디자이너'],
      startDate: new Date('2025-06-20'),
      endDate: new Date('2025-07-20'),
    }
  ]
  await Contest.bulkCreate(contestList, {
    ignoreDuplicates: true // 중복된 데이터는 생략하고 삽입
  });
  console.log('✅ 공모전 더미 데이터 삽입 완료');
  process.exit();
};

seedContests();
