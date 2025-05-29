import React from "react";
import { Div, Text, Image, ThemeProvider } from "atomize";
import { FiSearch, FiGrid, FiMenu } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai"; // ✅ 인증 아이콘 추가

// ✅ 카드 목록 데이터 (함수 바깥에 위치)
const cardData = [
  { title: "Hackathon 2023", date: "Dec 10, 2023", image: "01.jpeg" },
  { title: "Design Sprint", date: "Jan 15, 2024", image: "02.jpg" },
  { title: "AI Challenge", date: "Feb 20, 2024", image: "03.jpg" },
  { title: "Startup Weekend", date: "Mar 5, 2024", image: "04.avif" },
  { title: "Coding Bootcamp", date: "Apr 10, 2024", image: "05.png" },
  { title: "UX/UI Workshop", date: "May 22, 2024", image: "06.png" },
  { title: "Blockchain Seminar", date: "Jun 15, 2024", image: "07.png" },
  { title: "VR Hackathon", date: "Jul 25, 2024", image: "08.png" },
  { title: "Data Science Meetup", date: "Aug 18, 2024", image: "09.png" },
];

function App() {
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

        {/* 상단 아래 흰 줄 */}
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

        {/* ✅ 카드 목록 */}
        <Div px="1rem" py="1rem">
          <Text tag="h2" textColor="white" textSize="heading" m={{ b: "1rem" }}>
            Upcoming Contests
          </Text>
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
                <Image src={card.image} w="100%" h="180px" objectFit="cover" />
                <Div p="0.5rem">
                  <Text textColor="white" textWeight="700">{card.title}</Text>
                  <Text textColor="gray400" textSize="caption">{card.date}</Text>
                </Div>
              </Div>
            ))}
          </Div>

          {/* ✅ 맨 아래 흰 줄 */}
          <Div h="1px" bg="white" w="100%" m={{ t: "2rem" }} />
          <Div h="20px" />
        </Div>
      </Div>
    </ThemeProvider>
  );
}

export default App;
