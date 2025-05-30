import React, { useEffect, useState } from "react";
import { Div, Text, Image, ThemeProvider } from "atomize";
import { FiSearch, FiGrid, FiMenu } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";

// ✅ base URL 상수로 분리
const BASE_URL = "http://jeongwoo-kim-web.myds.me:8080";

function FirstPage() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/contests/recommend`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contests");
        return res.json();
      })
      .then((data) => {
        setCardData(data);
      })
      .catch((err) => {
        console.error("API 호출 실패:", err);
        setError("콘테스트 불러오기 실패");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider>
      <Div bg="black">
        {/* 상단바 */}
        <Div py="0.5rem" px="1rem" bg="black">
          <Div d="flex" justify="space-between" align="center">
            <Div d="flex" align="center">
              <FiMenu color="white" size={20} style={{ marginRight: "0.5rem" }} />
              <Text tag="h1" textColor="white" textSize="body">❄ 맹글</Text>
            </Div>
            <Div d="flex" align="center">
              <FiSearch color="white" size={20} style={{ marginRight: "1rem" }} />
              <FiGrid color="white" size={20} style={{ marginRight: "1rem" }} />
              <Image
                src="https://randomuser.me/api/portraits/women/44.jpg"
                h="24px"
                w="24px"
                rounded="circle"
              />
            </Div>
          </Div>
        </Div>

        <Div h="1px" bg="white" w="100%" />

        {/* 프로필 배너 */}
        <Div m="1rem" bg="black" rounded="xl" pos="relative" overflow="hidden">
          <Image
            src="/kd.jpg"
            w="100%"
            h="180px"
            objectFit="cover"
            rounded="xl"
          />
          <Div
            pos="absolute"
            top="130px"
            left="50%"
            transform="translateX(-50%)"
          >
            <Image
              src="https://randomuser.me/api/portraits/women/44.jpg"
              w="64px"
              h="64px"
              rounded="circle"
              border="2px solid white"
            />
          </Div>
          <Div textAlign="center" mt="1.5rem" p="1rem">
            <Text
              tag="h2"
              textColor="white"
              textSize="heading"
              d="flex"
              align="center"
              justify="center"
            >
              <b>Eun-ji Choi</b>
              <AiFillCheckCircle
                color="#1D9BF0"
                size={18}
                style={{ marginLeft: "0.5rem" }}
              />
            </Text>
            <Text textColor="gray300" textSize="body">@manggleUser</Text>
            <Text textColor="white" textSize="caption" m="0">
              <b>1.2K</b> followers &nbsp;&nbsp; <b>180</b> following
            </Text>
          </Div>
        </Div>

        {/* 콘텐츠 영역 */}
        <Div px="1rem" py="1rem">
          <Text tag="h2" textColor="white" textSize="heading" m={{ b: "1rem" }}>
            Upcoming Contests
          </Text>

          {/* 로딩, 에러, 빈 목록 처리 */}
          {loading && (
            <Text textColor="gray300" textAlign="center">로딩 중...</Text>
          )}

          {error && (
            <Text textColor="red500" textAlign="center">{error}</Text>
          )}

          {!loading && !error && cardData.length === 0 && (
            <Text textColor="gray300" textAlign="center">추천 콘테스트가 없습니다.</Text>
          )}

          {/* 카드 리스트 */}
          <Div d="flex" flexWrap="wrap" justify="space-between">
            {cardData.map((card, index) => (
              <Div
                key={index}
                w={{ xs: "100%", sm: "48%", md: "32%" }}
                m={{ b: "1rem" }}
                bg="black"
                rounded="xl"
                overflow="hidden"
              >
                <Image
                  src={card.image || "/default.jpg"}
                  w="100%"
                  h="180px"
                  objectFit="cover"
                />
                <Div p="0.5rem">
                  <Text textColor="white" textWeight="700">{card.title}</Text>
                  <Text textColor="gray400" textSize="caption">{card.description}</Text>
                </Div>
              </Div>
            ))}
          </Div>

          <Div h="1px" bg="white" w="100%" m={{ t: "2rem" }} />
          <Div h="20px" />
        </Div>
      </Div>
    </ThemeProvider>
  );
}

export default FirstPage;
