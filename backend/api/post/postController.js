// Express 모듈을 불러옵니다. 
// 이 모듈은 Node.js에서 HTTP 서버를 구축하고 라우팅을 쉽게 처리할 수 있도록 도와줍니다.
const express = require('express');

// 라우터 객체를 생성합니다. 이 객체에 엔드포인트(경로)와 해당 경로에서 실행할 함수를 정의합니다.
const router = express.Router();

// postService 모듈을 불러옵니다. 이 모듈에는 데이터베이스와 상호작용하는 함수들이 정의되어 있습니다.
const postService = require('./postService');

/// ✅ 1. 게시글 생성 - POST /create
/**
 * 새 게시글을 생성하는 컨트롤러 함수입니다.
 * - 요청 바디에서 title과 description을 추출하여 새 게시글을 생성합니다.
 * - 생성된 게시글 객체를 JSON 형식으로 응답합니다.
 */
const createPost = async (req, res, next) => {
    console.log("create");

    try {
        // 요청 본문에서 title과 description을 추출합니다.
        const { title, description } = req.body;
        console.log(`createPost - title : ${title}, description: ${description}`);

        // postService의 create 함수를 호출하여 새로운 게시글을 생성합니다.
        const newPost = await postService.create(title, description);

        // 생성된 게시글 객체를 JSON 형식으로 클라이언트에 응답합니다.
        res.status(200).json(newPost);
    } catch (err) {
        console.error("postController.createPost error:", err);
        res.status(404).json({ error: err.message });
    }
};

/// ✅ 2. 특정 게시글 조회 - GET /getOne/:id
/**
 * 특정 게시글을 조회하는 컨트롤러 함수입니다.
 * - 요청 URL에서 postId를 추출하여 해당 게시글을 조회합니다.
 * - 게시글이 없을 경우 404 상태 코드를 반환합니다.
 */
const getPost = async (req, res, next) => {
    try {
        // URL에서 id를 추출하고 정수형으로 변환합니다.
        const id = parseInt(req.params.id);
        console.log(`getPost - postId: ${id}`);

        // postService의 getOne 함수를 호출하여 게시글을 조회합니다.
        const post = await postService.getOne(id);

        if (!post) {
            // 게시글이 없을 경우 404 에러를 반환합니다.
            res.status(404).json({ error: "Post not found" });
        } else {
            // 게시글이 존재할 경우, 해당 게시글 객체를 반환합니다.
            res.status(200).json(post);
        }
    } catch (err) {
        console.error("Error in getPost:", err);
        res.status(500).json({ error: "Failed to retrieve post" });
        next(err);
    }
};

/// ✅ 3. 모든 게시글 조회 - GET /getAll
/**
 * 모든 게시글을 조회하는 컨트롤러 함수입니다.
 * - DB에 저장된 모든 게시글을 조회하여 반환합니다.
 */
const getAllPosts = async (req, res, next) => {
    try {
        // postService의 getAll 함수를 호출하여 모든 게시글을 조회합니다.
        const allPosts = await postService.getAll();

        // 조회된 모든 게시글을 JSON 형식으로 응답합니다.
        res.status(200).json(allPosts);
    } catch (err) {
        console.error("Error in getAllPosts:", err);
        res.status(500).json({ error: "Failed to retrieve posts" });
        next(err);
    }
};

/// ✅ 4. 게시글 수정 - PUT /updateOne/:id
/**
 * 특정 게시글을 수정하는 컨트롤러 함수입니다.
 * - 요청 URL에서 postId를 추출하고, 요청 본문에서 title과 description을 추출합니다.
 * - 해당 게시글이 존재하지 않을 경우 404 에러를 반환합니다.
 */
const updatePost = async (req, res, next) => {
    try {
        // URL에서 postId를 추출하여 정수형으로 변환합니다.
        const id = parseInt(req.params.id);

        // 요청 본문에서 title과 description을 추출합니다.
        const { title, description } = req.body;
        console.log(`updatePost - title : ${title}, description: ${description}, postId: ${id}`);

        // postService의 update 함수를 호출하여 게시글을 수정합니다.
        const updatedPost = await postService.update(id, title, description);

        if (updatedPost[0] === 0) {
            // 수정할 게시글이 존재하지 않을 경우 404 에러를 반환합니다.
            res.status(404).json({ error: "Post not found" });
        } else {
            // 수정된 게시글 정보를 응답합니다.
            res.status(200).json({ id, title, description });
        }
    } catch (err) {
        console.error("Error in updatePost:", err);
        res.status(500).json({ error: "Failed to update post" });
        next(err);
    }
};

/// ✅ 5. 게시글 삭제 - DELETE /deleteOne/:id
/**
 * 특정 게시글을 삭제하는 컨트롤러 함수입니다.
 * - 요청 URL에서 postId를 추출하여 해당 게시글을 삭제합니다.
 * - 삭제 성공 시 성공 메시지를 반환합니다.
 */
const deletePost = async (req, res, next) => {
    try {
        // URL에서 postId를 추출하여 정수형으로 변환합니다.
        const postId = parseInt(req.params.id);
        console.log(`deletePost - postId: ${postId}`);

        // postId가 유효한 숫자인지 확인합니다.
        if (isNaN(postId)) {
            return res.status(400).json({ error: "Invalid postId" });
        }

        // postService의 postDelete 함수를 호출하여 게시글을 삭제합니다.
        const postDelete = await postService.postDelete(postId);

        // 삭제 성공 시 성공 메시지를 반환합니다.
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("deletePost error", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ 라우터 경로 설정  
// 각 엔드포인트에 대해 해당 컨트롤러 함수를 매핑합니다.
router.get('/getOne/:id', getPost);        // 특정 게시글 조회
router.post('/create', createPost);        // 게시글 생성
router.get('/getAll', getAllPosts);        // 모든 게시글 조회
router.put('/updateOne/:id', updatePost);  // 특정 게시글 수정
router.delete('/deleteOne/:id', deletePost); // 특정 게시글 삭제

// 이 모듈을 내보내어 다른 파일에서 라우터를 사용할 수 있도록 합니다.
module.exports = router;
