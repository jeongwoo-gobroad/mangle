// Sequelize에서 where 연산자를 가져옵니다.
const { where } = require('sequelize');

// 'Post' 모델을 가져옵니다. 이 모델은 'models/post.js'에서 정의된 테이블 구조를 기반으로 합니다.
const { Post } = require('../../models');

/// ✅ 1. 게시글 생성 함수  
/**
 * 새 게시글을 생성합니다.
 * @param {string} title - 게시글 제목
 * @param {string} description - 게시글 내용
 * @returns {Object} 생성된 게시글 객체
 */
const create = async (title, description) => {
    try {
        // 새로운 게시글을 생성하고 DB에 저장합니다.
        const post = await Post.create({
            title: title,         // 제목
            description: description // 내용
        });

        console.log("Created Post:", post); // 생성된 게시글 정보 출력
        return post; // 생성된 게시글 객체 반환
    } catch (err) {
        // 에러 발생 시 에러 메시지 출력
        console.error("postService.create error:", err);
        throw err; // 에러를 호출한 곳으로 전달
    }
};

/// ✅ 2. 특정 게시글 조회 함수  
/**
 * 특정 게시글을 postId로 조회합니다.
 * @param {number} postId - 조회할 게시글의 ID
 * @returns {Object | null} 조회된 게시글 객체 또는 null (존재하지 않는 경우)
 */
const getOne = async (postId) => {
    try {
        // postId를 조건으로 특정 게시글을 조회합니다.
        const post = await Post.findOne({
            where: {
                postId: postId // 조건: postId가 일치하는 게시글
            }
        });

        console.log("Retrieved Post:", post); // 조회된 게시글 정보 출력
        return post; // 조회된 게시글 반환
    } catch (err) {
        console.error("postService.getOne error:", err);
        throw err;
    }
};

/// ✅ 3. 모든 게시글 조회 함수  
/**
 * 모든 게시글을 조회합니다.
 * @returns {Array} 게시글 목록 배열
 */
const getAll = async () => {
    try {
        // 모든 게시글을 조회합니다.
        const posts = await Post.findAll();

        console.log("All Posts:", posts); // 조회된 모든 게시글 정보 출력
        return posts; // 모든 게시글 목록 반환
    } catch (err) {
        console.error("postService.getAll error:", err);
        throw err;
    }
};

/// ✅ 4. 게시글 수정 함수  
/**
 * 특정 게시글을 업데이트합니다.
 * @param {number} postId - 수정할 게시글의 ID
 * @param {string} title - 새로운 제목
 * @param {string} description - 새로운 내용
 * @returns {Array} 수정된 행 수 (배열 형태로 반환됨)
 */
const update = async (postId, title, description) => {
    try {
        // 게시글을 업데이트합니다.
        const updatedPost = await Post.update(
            {
                title,       // 수정할 제목
                description  // 수정할 내용
            },
            {
                where: { postId } // 조건: postId가 일치하는 게시글
            }
        );

        console.log("Updated Post:", updatedPost); // 수정 결과 출력 (수정된 행 수)
        return updatedPost; // 수정된 행 수 반환
    } catch (err) {
        console.error("postService.update error:", err);
        throw err;
    }
};

/// ✅ 5. 게시글 삭제 함수  
/**
 * 특정 게시글을 삭제합니다.
 * @param {number} postId - 삭제할 게시글의 ID
 * @returns {number} 삭제된 행 수 (0 또는 1)
 */
const postDelete = async (postId) => {
    try {
        // 특정 게시글을 삭제합니다.
        const deletedPost = await Post.destroy({
            where: { postId } // 조건: postId가 일치하는 게시글
        });

        console.log("Deleted Post:", deletedPost); // 삭제 결과 출력 (삭제된 행 수)
        return deletedPost; // 삭제된 행 수 반환
    } catch (err) {
        console.error("postService.postDelete error:", err);
        throw err;
    }
};

// 모듈로 내보내기 - 외부에서 각 함수를 사용할 수 있도록 함
module.exports = {
    create,
    getOne,
    getAll,
    update,
    postDelete
};
