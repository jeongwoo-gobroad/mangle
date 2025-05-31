const axios = require('axios');
const { Contest, User } = require('../../models');

// 로그인한 유저의 관심사를 기반으로 공모전 추천
const getRecommendedContests = async (req, res) => {
  const startTime = Date.now();
  console.log('✅ [START] getRecommendedContests called at:', new Date().toISOString());
  console.log('📥 Request headers:', JSON.stringify(req.headers, null, 2));
  console.log('📥 Request user object:', JSON.stringify(req.user, null, 2));
  
  try {
    const userId = req.user.userId; // JWT 토큰에서 디코딩된 userId
    console.log('🔍 Extracted userId from JWT:', userId);

    console.log('🗄️  [DB QUERY START] Finding user by userId...');
    const user = await User.findOne({ where: { userId } });
    console.log('🗄️  [DB QUERY END] User query completed in:', Date.now() - startTime, 'ms');
    
    if (!user) {
      console.log('❌ User not found for userId:', userId);
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    
    console.log('👤 Found user:', {
      userId: user.userId,
      name: user.name || 'N/A',
      role: user.role,
      interests: user.interests,
      interestsType: typeof user.interests,
      interestsLength: Array.isArray(user.interests) ? user.interests.length : 'Not array'
    });

    const interests = user.interests; // 배열로 JSON 파싱된 상태
    const userRole = user.role;
    
    console.log('🎯 User filtering criteria:', {
      interests: interests,
      userRole: userRole
    });

    console.log('🗄️  [DB QUERY START] Finding all contests...');
    const contestQueryStart = Date.now();
    const contests = await Contest.findAll();
    console.log('🗄️  [DB QUERY END] Contest query completed in:', Date.now() - contestQueryStart, 'ms');
    console.log('📊 Total contests found:', contests.length);

    if (contests.length > 0) {
      console.log('📋 Sample contest structure:', {
        id: contests[0].id,
        title: contests[0].title || 'N/A',
        tags: contests[0].tags,
        tagsType: typeof contests[0].tags,
        requiredRoles: contests[0].requiredRoles,
        requiredRolesType: typeof contests[0].requiredRoles
      });
    }

    console.log('🔍 [FILTERING START] Applying user interest and role filters...');
    const filteredContests = contests.filter((contest, index) => {
      const tagMatch = contest.tags?.some(tag => interests.includes(tag));
      const roleMatch = contest.requiredRoles?.includes(userRole);
      const isMatch = tagMatch && roleMatch;
      
      console.log(`Contest ${index + 1}/${contests.length}:`, {
        contestId: contest.id,
        title: contest.title || 'N/A',
        tags: contest.tags,
        requiredRoles: contest.requiredRoles,
        tagMatch: tagMatch,
        roleMatch: roleMatch,
        finalMatch: isMatch
      });
      
      return isMatch;
    });
    console.log('🔍 [FILTERING END] Filtered contests count:', filteredContests.length);

    const responseData = filteredContests.map(contest => ({
      id: contest.id,
      title: contest.title,
      tags: contest.tags,
      requiredRoles: contest.requiredRoles,
      // 다른 필요한 필드들도 포함
      ...contest.toJSON()
    }));

    const totalTime = Date.now() - startTime;
    console.log('✅ [SUCCESS] getRecommendedContests completed successfully');
    console.log('⏱️  Total execution time:', totalTime, 'ms');
    console.log('📤 Response data count:', responseData.length);

    res.status(200).json(filteredContests);
  } catch (err) {
    const totalTime = Date.now() - startTime;
    console.error('❌ [ERROR] getRecommendedContests failed after:', totalTime, 'ms');
    console.error('❌ Error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      code: err.code || 'N/A'
    });
    res.status(500).json({ error: '추천 공모전 조회 중 오류 발생' });
  }
};

const getMatchedUsers = async (req, res) => {
  const startTime = Date.now();
  console.log('✅ [START] getMatchedUsers called at:', new Date().toISOString());
  console.log('📥 Request params:', JSON.stringify(req.params, null, 2));
  
  try {
    const contestId = req.params.contestId;
    console.log('🔍 Extracted contestId:', contestId, 'Type:', typeof contestId);

    console.log('🗄️  [DB QUERY START] Finding contest by primary key...');
    const contestQueryStart = Date.now();
    const contest = await Contest.findByPk(contestId);
    console.log('🗄️  [DB QUERY END] Contest query completed in:', Date.now() - contestQueryStart, 'ms');
    
    if (!contest) {
      console.log('❌ Contest not found for contestId:', contestId);
      return res.status(404).json({ error: '공모전이 존재하지 않습니다.' });
    }
    
    console.log('🏆 Found contest:', {
      id: contest.id,
      title: contest.title || 'N/A',
      requiredRoles: contest.requiredRoles,
      requiredRolesType: typeof contest.requiredRoles,
      tags: contest.tags,
      tagsType: typeof contest.tags
    });

    const { requiredRoles, tags } = contest;
    console.log('🎯 Matching criteria extracted:', {
      requiredRoles: requiredRoles,
      tags: tags
    });

    console.log('🗄️  [DB QUERY START] Finding all users with specific attributes...');
    const userQueryStart = Date.now();
    const users = await User.findAll({
      attributes: ['userId', 'name', 'role', 'interests'],
    });
    console.log('🗄️  [DB QUERY END] User query completed in:', Date.now() - userQueryStart, 'ms');
    console.log('👥 Total users found:', users.length);

    if (users.length > 0) {
      console.log('👤 Sample user structure:', {
        userId: users[0].userId,
        name: users[0].name || 'N/A',
        role: users[0].role,
        interests: users[0].interests,
        interestsType: typeof users[0].interests
      });
    }

    console.log('🔍 [FILTERING START] Applying role and interest matching...');
    const matchedUsers = users.filter((user, index) => {
      const roleMatch = requiredRoles.includes(user.role);
      const interestMatch = user.interests.some(interest => tags.includes(interest));
      const isMatch = roleMatch && interestMatch;
      
      console.log(`User ${index + 1}/${users.length}:`, {
        userId: user.userId,
        name: user.name || 'N/A',
        role: user.role,
        interests: user.interests,
        roleMatch: roleMatch,
        interestMatch: interestMatch,
        finalMatch: isMatch
      });
      
      return isMatch;
    });
    console.log('🔍 [FILTERING END] Matched users count:', matchedUsers.length);

    const totalTime = Date.now() - startTime;
    console.log('✅ [SUCCESS] getMatchedUsers completed successfully');
    console.log('⏱️  Total execution time:', totalTime, 'ms');
    console.log('📤 Response data count:', matchedUsers.length);

    res.status(200).json(matchedUsers);
  } catch (err) {
    const totalTime = Date.now() - startTime;
    console.error('❌ [ERROR] getMatchedUsers failed after:', totalTime, 'ms');
    console.error('❌ Error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      code: err.code || 'N/A'
    });
    res.status(500).json({ error: '추천 사용자 조회 중 오류 발생' });
  }
};

const getRelatedWinningProjects = async (req, res) => {
  const startTime = Date.now();
  console.log('🎯 [START] getRelatedWinningProjects 함수 실행 at:', new Date().toISOString());
  console.log('✅ [GET] /contests/:contestId/related-wins 요청 진입');
  console.log('📥 Request params:', JSON.stringify(req.params, null, 2));
  console.log('📥 Request query:', JSON.stringify(req.query, null, 2));
  console.log('📥 Request headers:', JSON.stringify(req.headers, null, 2));
  
  try {
    const contestId = req.params.contestId;
    console.log('🔍 공모전 ID 확인:', contestId, 'Type:', typeof contestId);

    console.log('🗄️  [DB QUERY START] Finding contest by primary key...');
    const contestQueryStart = Date.now();
    const contest = await Contest.findByPk(contestId);
    console.log('🗄️  [DB QUERY END] Contest query completed in:', Date.now() - contestQueryStart, 'ms');
    
    if (!contest) {
      console.log('❌ Contest not found for contestId:', contestId);
      return res.status(404).json({ error: '공모전이 존재하지 않습니다.' });
    }

    console.log('🏆 Found contest details:', {
      id: contest.id,
      title: contest.title || 'N/A',
      tags: contest.tags,
      tagsType: typeof contest.tags,
      tagsIsArray: Array.isArray(contest.tags),
      tagsLength: Array.isArray(contest.tags) ? contest.tags.length : 'N/A'
    });

    const tags = contest.tags;
    if (!Array.isArray(tags) || tags.length === 0) {
      console.log('❌ Invalid tags:', {
        tags: tags,
        isArray: Array.isArray(tags),
        length: tags ? tags.length : 'N/A'
      });
      return res.status(400).json({ error: '공모전 태그가 존재하지 않습니다.' });
    }

    const tagString = tags.join(',');
    console.log('🎯 추천 기준 태그 문자열:', tagString);
    console.log('🎯 태그 문자열 길이:', tagString.length);

    const externalApiUrl = 'http://127.0.0.1:8000/simliarity_engine/';
    const requestPayload = { target_idea: tagString };
    
    console.log('🚀 외부 유사도 추천 서버에 요청 보냄...');
    console.log('🌐 API URL:', externalApiUrl);
    console.log('📦 Request payload:', JSON.stringify(requestPayload, null, 2));
    
    const apiRequestStart = Date.now();
    const response = await axios.post(externalApiUrl, requestPayload, {
      timeout: 30000, // 30초 타임아웃
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Contest-Recommendation-Service'
      }
    });
    const apiRequestTime = Date.now() - apiRequestStart;
    
    console.log('📡 External API response received in:', apiRequestTime, 'ms');
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', JSON.stringify(response.headers, null, 2));
    console.log('📦 Raw response data type:', typeof response.data);
    console.log('📦 Raw response data:', JSON.stringify(response.data, null, 2));

    const data = response.data;

    if (!Array.isArray(data)) {
      console.log('❌ Invalid response format:', {
        dataType: typeof data,
        isArray: Array.isArray(data),
        data: data
      });
      return res.status(502).json({ error: '외부 서버 응답 형식이 올바르지 않습니다.' });
    }

    console.log('📊 Response data array length:', data.length);
    
    if (data.length > 0) {
      console.log('📋 Sample response item structure:', {
        item: JSON.stringify(data[0], null, 2),
        hasScore: 'similarity' in data[0],
        hasText: 'target_text' in data[0],
        hasHowSimilar: 'how_similar' in data[0]
      });
    }

    console.log('🔄 [MAPPING START] Processing response data...');
    const results = data.map((item, index) => {
      console.log(`Processing item ${index + 1}/${data.length}:`, {
        similarity: item.similarity,
        target_text: item.target_text ? item.target_text.substring(0, 100) + '...' : 'N/A',
        how_similar_exists: !!item.how_similar,
        similarity_points_exists: !!(item.how_similar && item.how_similar.similarity_points)
      });
      
      return {
        score: item.similarity,
        text: item.target_text,
        points: item.how_similar?.similarity_points?.map(p => p.similar_point_from_B) || []
      };
    });
    console.log('🔄 [MAPPING END] Processed', results.length, 'items');

    const responsePayload = {
      tag_used: tagString,
      results
    };

    const totalTime = Date.now() - startTime;
    console.log('✅ [SUCCESS] getRelatedWinningProjects completed successfully');
    console.log('⏱️  Total execution time:', totalTime, 'ms');
    console.log('⏱️  External API time:', apiRequestTime, 'ms');
    console.log('📤 Final response structure:', {
      tag_used: tagString,
      results_count: results.length
    });

    return res.status(200).json(responsePayload);
  } catch (err) {
    const totalTime = Date.now() - startTime;
    console.error('❌ [ERROR] getRelatedWinningProjects failed after:', totalTime, 'ms');
    
    if (err.response) {
      // 외부 API 응답 에러
      console.error('❌ External API Error Response:', {
        status: err.response.status,
        statusText: err.response.statusText,
        headers: err.response.headers,
        data: err.response.data
      });
    } else if (err.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.error('❌ External API No Response:', {
        request: err.request,
        timeout: err.code === 'ECONNABORTED'
      });
    } else {
      // 기타 에러
      console.error('❌ General Error:', {
        message: err.message,
        stack: err.stack,
        name: err.name,
        code: err.code || 'N/A'
      });
    }
    
    return res.status(500).json({ error: '관련 수상작 조회 중 오류 발생' });
  }
};

const getRelatedWinsByIdea = async (req, res) => {
  const startTime = Date.now();
  console.log('🎯 [START] getRelatedWinsByIdea 함수 실행 at:', new Date().toISOString());
  console.log('📥 Request query params:', JSON.stringify(req.query, null, 2));
  console.log('📥 Request headers:', JSON.stringify(req.headers, null, 2));
  
  try {
    const idea = req.query.idea;
    console.log('🔍 Raw idea parameter:', {
      idea: idea,
      type: typeof idea,
      length: idea ? idea.length : 'N/A'
    });

    if (!idea) {
      console.log('❌ Missing idea parameter');
      return res.status(400).json({ error: 'idea 쿼리 파라미터가 필요합니다.' });
    }

    if (typeof idea !== 'string' || idea.trim().length === 0) {
      console.log('❌ Invalid idea parameter:', { idea, type: typeof idea });
      return res.status(400).json({ error: 'idea 파라미터가 유효하지 않습니다.' });
    }

    const trimmedIdea = idea.trim();
    console.log('📥 사용자 입력 아이디어:', trimmedIdea);
    console.log('📊 아이디어 길이:', trimmedIdea.length);

    const externalApiUrl = 'http://jeongwoo-kim-web.myds.me:8000/simliarity_engine/';
    const requestPayload = { target_idea: trimmedIdea };
    
    console.log('🚀 외부 서버에 POST 요청 보냄...');
    console.log('🌐 API URL:', externalApiUrl);
    console.log('📦 Request payload:', JSON.stringify(requestPayload, null, 2));
    
    const apiRequestStart = Date.now();
    const response = await axios.post(externalApiUrl, requestPayload, {
      timeout: 30000, // 30초 타임아웃
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Contest-Idea-Service'
      }
    });
    const apiRequestTime = Date.now() - apiRequestStart;

    console.log('📡 External API response received in:', apiRequestTime, 'ms');
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', JSON.stringify(response.headers, null, 2));
    console.log('📦 Raw response data type:', typeof response.data);
    console.log('📦 Raw response data length:', Array.isArray(response.data) ? response.data.length : 'Not array');

    const data = response.data;

    if (!Array.isArray(data)) {
      console.log('❌ Invalid response format:', {
        dataType: typeof data,
        isArray: Array.isArray(data),
        data: data
      });
      return res.status(502).json({ error: '외부 서버 응답 형식이 잘못되었습니다.' });
    }

    console.log('📊 Response data array length:', data.length);
    
    if (data.length > 0) {
      console.log('📋 Sample response item:', {
        item: JSON.stringify(data[0], null, 2),
        hasScore: 'similarity' in data[0],
        hasText: 'target_text' in data[0],
        hasHowSimilar: 'how_similar' in data[0]
      });
    }

    console.log('🔄 [MAPPING START] Processing response data...');
    const results = data.map((item, index) => {
      const similarityPoints = item.how_similar?.similarity_points;
      const points = Array.isArray(similarityPoints) 
        ? similarityPoints.map(p => p.similar_point_from_B) 
        : [];
      
      console.log(`Processing item ${index + 1}/${data.length}:`, {
        similarity: item.similarity,
        target_text_preview: item.target_text ? item.target_text.substring(0, 50) + '...' : 'N/A',
        points_count: points.length,
        has_how_similar: !!item.how_similar
      });
      
      return {
        score: item.similarity,
        text: item.target_text,
        points: points
      };
    });
    console.log('🔄 [MAPPING END] Processed', results.length, 'items');

    const responsePayload = {
      input: trimmedIdea,
      results
    };

    const totalTime = Date.now() - startTime;
    console.log('✅ [SUCCESS] getRelatedWinsByIdea completed successfully');
    console.log('⏱️  Total execution time:', totalTime, 'ms');
    console.log('⏱️  External API time:', apiRequestTime, 'ms');
    console.log('📤 Final response structure:', {
      input: trimmedIdea,
      results_count: results.length
    });

    return res.status(200).json(responsePayload);

  } catch (err) {
    const totalTime = Date.now() - startTime;
    console.error('❌ [ERROR] getRelatedWinsByIdea failed after:', totalTime, 'ms');
    
    if (err.response) {
      // 외부 API 응답 에러
      console.error('❌ External API Error Response:', {
        status: err.response.status,
        statusText: err.response.statusText,
        headers: JSON.stringify(err.response.headers, null, 2),
        data: JSON.stringify(err.response.data, null, 2)
      });
    } else if (err.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.error('❌ External API No Response:', {
        timeout: err.code === 'ECONNABORTED',
        code: err.code,
        errno: err.errno,
        syscall: err.syscall,
        hostname: err.hostname
      });
    } else {
      // 기타 에러
      console.error('❌ General Error:', {
        message: err.message,
        stack: err.stack,
        name: err.name,
        code: err.code || 'N/A'
      });
    }
    
    return res.status(500).json({ error: '관련 수상작 조회 중 오류 발생' });
  }
};

module.exports = {
  getRecommendedContests,
  getMatchedUsers,
  getRelatedWinningProjects,
  getRelatedWinsByIdea,
};