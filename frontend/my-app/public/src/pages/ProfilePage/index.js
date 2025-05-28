import React, { useState } from "react";
import styled from "styled-components";

// HexagonGraph component
const HexagonGraph = ({ capabilities, values }) => {
    const size = 100; // 육각형의 반지름
    // SVG 영역 확보 및 글자 잘림 방지를 위해 중심 좌표를 더 여유 있게 설정
    // 이전 padding(60)에서 텍스트 길이를 고려하여 더 늘립니다.
    const padding = 70; // 추가적인 패딩 (글자가 최대로 튀어나올 공간)
    const centerX = size + padding;
    const centerY = size + padding;
    const numSides = capabilities.length;

    // 핵심 수정: 상단(프론트엔드)을 기준으로 각도 오프셋 설정
    // SVG에서 0라디안은 오른쪽 (+X축)을 가리키므로,
    // 육각형의 꼭지점 하나를 정확히 상단(-Y축)에 두려면 -Math.PI / 2 (-90도)를 더합니다.
    const angleOffset = -Math.PI / 2;
    const angleIncrement = (Math.PI * 2) / numSides; // 각 능력치 간의 각도 간격

    // 육각형 외곽선 포인트 계산
    const hexagonPoints = capabilities
        .map((_, i) => {
            const angle = i * angleIncrement + angleOffset;
            const x = centerX + size * Math.cos(angle);
            const y = centerY + size * Math.sin(angle);
            return `${x},${y}`;
        })
        .join(" ");

    // 능력치 데이터 포인트 계산 (채워진 영역)
    const capabilityPoints = values
        .map((value, i) => {
            const angle = i * angleIncrement + angleOffset;
            const scaledValue = (value / 100) * size; // 0-100% 값을 0-size로 변환
            const x = centerX + scaledValue * Math.cos(angle);
            const y = centerY + scaledValue * Math.sin(angle);
            return `${x},${y}`;
        })
        .join(" ");

    // SVG의 최종 너비와 높이. padding을 양쪽에 적용하여 충분한 공간 확보
    // 텍스트가 길고 폰트가 두껍다면 이 값을 더 늘릴 필요가 있습니다.
    const svgWidth = size * 2 + padding * 2;
    const svgHeight = size * 2 + padding * 2;

    return (
        <GraphContainer>
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                <g>
                    {/* 육각형 외곽선 */}
                    <polygon points={hexagonPoints} fill="none" stroke="#666" strokeWidth="1" />

                    {/* 축 라인 */}
                    {capabilities.map((_, i) => {
                        const angle = i * angleIncrement + angleOffset;
                        const x = centerX + size * Math.cos(angle);
                        const y = centerY + size * Math.sin(angle);
                        return (
                            <line
                                key={i}
                                x1={centerX}
                                y1={centerY}
                                x2={x}
                                y2={y}
                                stroke="#444"
                                strokeWidth="0.5"
                            />
                        );
                    })}

                    {/* 채워진 능력치 영역 */}
                    <polygon points={capabilityPoints} fill="#948dce" fillOpacity="0.7" />

                    {/* 능력치 레이블 */}
                    {capabilities.map((capability, i) => {
                        const angle = i * angleIncrement + angleOffset;
                        const labelOffset = 40; // 텍스트를 육각형 테두리에서 더 멀리 떨어뜨림 (이전 35에서 증가)
                        const x = centerX + (size + labelOffset) * Math.cos(angle);
                        const y = centerY + (size + labelOffset) * Math.sin(angle);

                        let textAnchor = "middle"; // 기본값은 중앙 정렬
                        let dyOffset = 0; // 추가적인 수직 오프셋
                        let dxOffset = 0; // 추가적인 수평 오프셋

                        // 각 레이블의 위치 및 정렬 미세 조정
                        // '환경 문제 해결'과 '사회 문제 해결'처럼 긴 텍스트를 고려하여 조정
                        if (i === 0) { // 프론트엔드 (Top)
                            dyOffset = -8; // 위로 약간 더 올림
                        } else if (i === 1) { // 백엔드 (Top-Right)
                            textAnchor = "start"; // 오른쪽 정렬
                            dxOffset = 10; // 오른쪽으로 더 이동
                            dyOffset = 2; // 아래로 약간 이동
                        } else if (i === 2) { // 디자인 (Bottom-Right)
                            textAnchor = "start";
                            dxOffset = 10;
                            dyOffset = 15; // 아래로 더 이동
                        } else if (i === 3) { // 환경 문제 해결 (Bottom)
                            dyOffset = 20; // 아래로 더 이동 (긴 글자)
                        } else if (i === 4) { // 사회 문제 해결 (Bottom-Left)
                            textAnchor = "end"; // 왼쪽 정렬
                            dxOffset = -10; // 왼쪽으로 더 이동
                            dyOffset = 15; // 아래로 더 이동 (긴 글자)
                        } else if (i === 5) { // 경영 (Top-Left)
                            textAnchor = "end";
                            dxOffset = -10;
                            dyOffset = 2;
                        }

                        return (
                            <text
                                key={i}
                                x={x + dxOffset}
                                y={y + dyOffset}
                                fill="white"
                                fontSize="16px"
                                fontWeight="bold" // 폰트가 더 두꺼울 경우 공간이 더 필요할 수 있습니다.
                                textAnchor={textAnchor}
                                fontFamily="AppleSDGothicNeo-Regular, 'Noto Sans KR', sans-serif" // 폰트 확인
                            >
                                {capability}
                            </text>
                        );
                    })}
                </g>
            </svg>
        </GraphContainer>
    );
};

// ProfilePage 컴포넌트는 그대로 유지됩니다.
function ProfilePage() {
    // useState 훅이 제대로 import 되어 있는지 확인하세요.
    // import React, { useState } from "react"; 이 코드 줄이 ProfilePage 컴포넌트 파일 상단에 있어야 합니다.
    const [username, setUsername] = useState("");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [weeklySummary, setWeeklySummary] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleToggle = (setter, currentValue) => {
        setter(!currentValue);
    };

    const handleSaveChanges = () => {
        console.log("Saving changes:", {
            username,
            emailNotifications,
            smsAlerts,
            pushNotifications,
            weeklySummary,
            firstName,
            lastName,
            email,
            phoneNumber,
        });
        alert("변경 사항이 저장되었습니다!");
    };

    const handleCancel = () => {
        alert("변경 사항이 취소되었습니다.");
    };

    // 능력치 순서는 이미지와 동일하게 (상단부터 시계 방향)
    const capabilities = [
        "프론트엔드",
        "백엔드",
        "디자인",
        "환경 문제 해결",
        "사회 문제 해결",
        "경영",
    ];

    // 능력치 값 (순서 일치)
    const capabilityValues = [
        70, // 프론트엔드
        90, // 백엔드
        60, // 디자인
        50, // 환경 문제 해결
        80, // 사회 문제 해결
        75, // 경영
    ];

    return (
        <Container>
            <Header>＊ 맹글</Header>
            <ContentArea>
                <PageTitle>Profile Settings</PageTitle>

                <Section>
                    <InputWrapper>
                        <SectionTitle>Username</SectionTitle>
                        <UsernameInputContainer>
                            <StyledProfileImage src="/images/profile.png" alt="프로필" />
                            <StyledLinkIcon src="/images/pencil.png" alt="연필" />
                            <UsernameInputField
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </UsernameInputContainer>
                    </InputWrapper>
                </Section>

                {/* Hexagon Graph 섹션 */}
                <Section>
                    <SectionTitle>Capabilities</SectionTitle>
                    <HexagonGraph capabilities={capabilities} values={capabilityValues} />
                </Section>

                <Section>
                    <SectionTitle>Notifications</SectionTitle>
                    <NotificationItem>
                        <NotificationText>
                            <NotificationLabel>Email Notifications</NotificationLabel>
                            <NotificationDescription>Receive updates via email</NotificationDescription>
                        </NotificationText>
                        <ToggleSwitch>
                            <input
                                type="checkbox"
                                checked={emailNotifications}
                                onChange={() => handleToggle(setEmailNotifications, emailNotifications)}
                            />
                            <span />
                        </ToggleSwitch>
                    </NotificationItem>
                    <NotificationItem>
                        <NotificationText>
                            <NotificationLabel>SMS Alerts</NotificationLabel>
                            <NotificationDescription>Receive alerts via SMS</NotificationDescription>
                        </NotificationText>
                        <ToggleSwitch>
                            <input
                                type="checkbox"
                                checked={smsAlerts}
                                onChange={() => handleToggle(setSmsAlerts, smsAlerts)}
                            />
                            <span />
                        </ToggleSwitch>
                    </NotificationItem>
                    <NotificationItem>
                        <NotificationText>
                            <NotificationLabel>Push Notifications</NotificationLabel>
                            <NotificationDescription>Receive push notifications</NotificationDescription>
                        </NotificationText>
                        <ToggleSwitch>
                            <input
                                type="checkbox"
                                checked={pushNotifications}
                                onChange={() => handleToggle(setPushNotifications, pushNotifications)}
                            />
                            <span />
                        </ToggleSwitch>
                    </NotificationItem>
                    <NotificationItem>
                        <NotificationText>
                            <NotificationLabel>Weekly Summary</NotificationLabel>
                            <NotificationDescription>Receive a weekly activity summary</NotificationDescription>
                        </NotificationText>
                        <ToggleSwitch>
                            <input
                                type="checkbox"
                                checked={weeklySummary}
                                onChange={() => handleToggle(setWeeklySummary, weeklySummary)}
                            />
                            <span />
                        </ToggleSwitch>
                    </NotificationItem>
                </Section>

                <Section>
                    <SectionTitle>Personal Information</SectionTitle>
                    <InputGroup>
                        <InputWrapper>
                            <Label>First Name</Label>
                            <StyledInput
                                type="text"
                                placeholder="Arin"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Last Name</Label>
                            <StyledInput
                                type="text"
                                placeholder="Zylstra"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </InputWrapper>
                    </InputGroup>
                    <InputWrapper>
                        <Label>Email</Label>
                        <StyledInput
                            type="email"
                            placeholder="arin.zylstra@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label>Phone Number</Label>
                        <StyledInput
                            type="tel"
                            placeholder="+1234567890"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </InputWrapper>
                </Section>

                <ButtonContainer>
                    <SaveChangesButton onClick={handleSaveChanges}>Save Changes</SaveChangesButton>
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                </ButtonContainer>
            </ContentArea>
        </Container>
    );
}

export default ProfilePage;

// Styled-components는 이전과 동일합니다.
const Container = styled.div`
    background-color: black;
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
`;

const Header = styled.div`
    font-size: 24px;
    color: #948dce;
    font-weight: bold;
    align-self: flex-start;
    margin-left: 30px;
    width: 100%;
    border-bottom: 1px solid #333;
    padding-bottom: 5px;
    padding-left: 30px;
    padding-top: 60px;
    margin-bottom: 0px;
`;

const ContentArea = styled.div`
    width: 800px;
    max-width: 90%;
    margin-top: 0px;
    padding: 20px;
`;

const PageTitle = styled.h1`
    margin-top: 10px;
    font-size: 34px;
    margin-bottom: 10px;
    color: white;
    font-weight: bold;
`;

const Section = styled.div`
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #333;
`;

const SectionTitle = styled.h2`
    font-size: 22px;
    margin-bottom: 20px;
    color: white;
`;

const UsernameInputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 0px;
`;

const StyledProfileImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #6b72e2;
`;

const StyledLinkIcon = styled.img`
    width: 32px;
    height: 32px;
    cursor: pointer;
    position: relative;
    left: -35px;
    top: 20px;
    z-index: 1;
`;

const UsernameInputField = styled.input`
    flex-grow: 1;
    padding: 12px;
    border: 1px solid #555;
    border-radius: 8px;
    background-color: #1a1a1a;
    color: white;
    font-size: 16px;
    outline: none;
    &:focus {
        border-color: #948dce;
    }
    &::placeholder {
        color: #888;
    }
`;

const NotificationItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const NotificationText = styled.div`
    display: flex;
    flex-direction: column;
`;

const NotificationLabel = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: white;
`;

const NotificationDescription = styled.span`
    font-size: 14px;
    color: #ccc;
`;

const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 48px;
    height: 28px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #555;
        transition: 0.4s;
        border-radius: 34px;

        &:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }
    }

    input:checked + span {
        background-color: #948dce;
    }

    input:focus + span {
        box-shadow: 0 0 1px #948dce;
    }

    input:checked + span:before {
        transform: translateX(20px);
    }
`;

const InputGroup = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 0px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px;
`;

const Label = styled.label`
    font-size: 14px;
    color: #ccc;
    margin-bottom: 5px;
`;

const StyledInput = styled.input`
    flex: 1;
    padding: 12px;
    border: 1px solid #555;
    border-radius: 8px;
    background-color: #1a1a1a;
    color: white;
    font-size: 16px;
    outline: none;
    &:focus {
        border-color: #948dce;
    }
    &::placeholder {
        color: #888;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 30px;
    justify-content: flex-start;
`;

const SaveChangesButton = styled.button`
    padding: 12px 25px;
    border-radius: 6px;
    background-color: #948dce;
    color: black;
    font-weight: bold;
    border: none;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        opacity: 0.9;
    }
`;

const CancelButton = styled.button`
    padding: 12px 25px;
    border-radius: 6px;
    background-color: #333;
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #555;
    }
`;

const GraphContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 40px;
`;