// Sequelize 모듈을 불러옵니다. Sequelize는 Node.js에서 사용하는 ORM(Object-Relational Mapping) 라이브러리입니다.
const Sequelize = require('sequelize');

// 현재 환경 변수를 가져옵니다. 기본값은 'development'로 설정됩니다.
// NODE_ENV 환경 변수가 설정되지 않았을 경우 'development' 환경이 기본값이 됩니다.
const env = process.env.NODE_ENV || 'development';

// config 파일에서 현재 환경에 맞는 DB 설정 정보를 불러옵니다.
// 예: development, test, production
const config = require('../config/config')[env];

// db 객체를 생성하여 모델들을 저장할 컨테이너로 사용합니다.
const db = {};

// Sequelize 인스턴스를 생성합니다.
// 첫 번째 인자: 데이터베이스 이름
// 두 번째 인자: 사용자명
// 세 번째 인자: 비밀번호
// 네 번째 인자: 기타 설정 옵션
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 생성된 Sequelize 인스턴스를 db 객체에 저장하여 외부에서 접근할 수 있도록 합니다.
db.sequelize = sequelize; // Sequelize 인스턴스
db.Sequelize = Sequelize; // Sequelize 라이브러리 자체
// ✅ 클래스 import
//const Post = require('./post');

// ✅ 모델 초기화
//Post.init(sequelize);

// ✅ 관계 설정 (associate)
//Post.associate(db);

// ✅ db에 등록

//db.Post = Post;


// 모델 import
const User = require('./user');
const Contest = require('./contest');
const TeamPost = require('./teamPost');
const Message = require('./message');

// 모델 init
User.init(sequelize);
Contest.init(sequelize);
TeamPost.init(sequelize);
Message.init(sequelize);

// 먼저 db에 등록 (이 시점부터 db.User, db.TeamPost가 정의됨)
db.User = User;
db.Contest = Contest;
db.TeamPost = TeamPost;
db.Message = Message;

// associate는 등록 이후에 호출
User.associate(db);
Contest.associate(db);
TeamPost.associate(db);
Message.associate(db);

module.exports = db;
