// 이 모듈은 Sequelize ORM을 사용하여 'Posts' 테이블을 정의하고, 이를 모델로 내보냅니다.
module.exports = (sequelize, DataTypes) => {

    // ❗️DB 관련 오류가 발생할 경우, 아래의 코드 블록 주석을 해제하고 실행하여 'Posts' 테이블을 삭제할 수 있습니다.
    // 이 코드는 데이터베이스 테이블을 강제로 삭제하므로, 실제 서비스 환경에서는 주의해서 사용해야 합니다.
    
    /*
    (async () => {
        try {
            // 'Posts' 테이블이 존재할 경우 삭제
            await sequelize.query('DROP TABLE IF EXISTS Posts;');
            console.log("테이블이 성공적으로 삭제되었습니다.");
        } catch (error) {
            // 테이블 삭제 중 에러가 발생할 경우 에러 메시지 출력
            console.error("테이블 삭제 에러:", error);
        } finally {
            // 데이터베이스 연결을 닫습니다.
            sequelize.close();
        }
    })();
    */

    /**
     * 'Post' 모델 정의
     * - Sequelize의 define() 메서드를 사용하여 테이블을 정의합니다.
     * - 첫 번째 인자: 모델명 (이 경우 'Post')
     * - 두 번째 인자: 테이블 필드 및 데이터 타입 정의
     * - 세 번째 인자: 추가 옵션 (timestamps, tableName 등)
     */
    const Post = sequelize.define(
        'Post', 
        {
            /**
             * postId: 게시글 고유 식별자
             * - INTEGER: 정수형 데이터
             * - primaryKey: 기본 키로 설정
             * - autoIncrement: 자동 증가값 설정
             */
            postId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            /**
             * title: 게시글 제목
             * - STRING(25): 최대 25자까지 허용되는 문자열
             * - allowNull: false -> 필수 입력 필드
             */
            title: {
                type: DataTypes.STRING(25),
                allowNull: false,
            },

            /**
             * description: 게시글 내용
             * - STRING(500): 최대 500자까지 허용되는 문자열
             * - allowNull: true -> 선택 입력 필드
             */
            description: { 
                type: DataTypes.STRING(500),
                allowNull: true,
            },
        },
        {
            /**
             * 추가 옵션
             * - timestamps: true -> createdAt, updatedAt 필드가 자동으로 생성됨
             * - tableName: 'Posts' -> 데이터베이스에 생성될 실제 테이블명
             */
            timestamps: true, 
            tableName: 'Posts'
        }
    );

    // 정의한 모델을 반환하여 외부에서 사용할 수 있도록 합니다.
    return Post;
};
