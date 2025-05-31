// src/pages/ProfilePage/index.js
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// HexagonGraph component (변경 없음)
const HexagonGraph = ({ capabilities, values }) => {
    const size = 120;
    const padding = 100;
    const centerX = size + padding;
    const centerY = size + padding;
    const numSides = capabilities.length;

    const angleOffset = -Math.PI / 2;
    const angleIncrement = (Math.PI * 2) / numSides;

    const hexagonPoints = capabilities
        .map((_, i) => {
            const angle = i * angleIncrement + angleOffset;
            const x = centerX + size * Math.cos(angle);
            const y = centerY + size * Math.sin(angle);
            return `${x},${y}`;
        })
        .join(" ");

    const capabilityPoints = values
        .map((value, i) => {
            const angle = i * angleIncrement + angleOffset;
            const scaledValue = (value / 100) * size;
            const x = centerX + scaledValue * Math.cos(angle);
            const y = centerY + scaledValue * Math.sin(angle);
            return `${x},${y}`;
        })
        .join(" ");

    const svgWidth = size * 2 + padding * 2;
    const svgHeight = size * 2 + padding * 2;

    return (
        <GraphContainer>
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                <g>
                    <polygon points={hexagonPoints} fill="none" stroke="#666" strokeWidth="1" />
                    {capabilities.map((_, i) => {
                        const angle = i * angleIncrement + angleOffset;
                        const x = centerX + size * Math.cos(angle);
                        const y = centerY + size * Math.sin(angle);
                        return (
                            <line
                                key={`axis-${i}`}
                                x1={centerX}
                                y1={centerY}
                                x2={x}
                                y2={y}
                                stroke="#444"
                                strokeWidth="0.5"
                            />
                        );
                    })}
                    <polygon points={capabilityPoints} fill="#948dce" fillOpacity="0.7" />
                    {capabilities.map((capability, i) => {
                        const angle = i * angleIncrement + angleOffset;
                        const labelOffset = 20;
                        const x = centerX + (size + labelOffset) * Math.cos(angle);
                        const y = centerY + (size + labelOffset) * Math.sin(angle);

                        let textAnchor = "middle";
                        let dyOffset = 0;
                        let dxOffset = 0;

                        if (i === 0) {
                            dyOffset = -5;
                        } else if (i === 1) {
                            textAnchor = "start";
                            dxOffset = 5;
                            dyOffset = 2;
                        } else if (i === 2) {
                            textAnchor = "start";
                            dxOffset = 5;
                            dyOffset = 8;
                        } else if (i === 3) {
                            dyOffset = 12;
                        } else if (i === 4) {
                            textAnchor = "end";
                            dxOffset = 5; // 이 값은 아마 -5가 되어야 할 수도 있습니다. 텍스트 위치를 확인하세요.
                            dyOffset = 8;
                        } else if (i === 5) {
                            textAnchor = "end";
                            dxOffset = -5;
                            dyOffset = 2;
                        }

                        return (
                            <text
                                key={`label-${i}`}
                                x={x + dxOffset}
                                y={y + dyOffset}
                                fill="white"
                                fontSize="13px"
                                fontWeight="bold"
                                textAnchor={textAnchor}
                                fontFamily="AppleSDGothicNeo-Regular, 'Noto Sans KR', sans-serif"
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

// ProfilePage 컴포넌트
function ProfilePage() {
    const [username, setUsername] = useState("");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [weeklySummary, setWeeklySummary] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();

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

    const capabilities = [
        "프론트엔드",
        "백엔드",
        "디자인",
        "환경 문제 해결",
        "사회 문제 해결",
        "경영",
    ];

    const capabilityValues = [
        70, 90, 60, 50, 60, 75,
    ];

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <Menu>
                        <Line />
                        <Line />
                        <Line />
                    </Menu>
                    <HeaderTitle>
                        ＊ 맹글
                    </HeaderTitle>
                </HeaderLeft>
                <ProfileImage src="/images/profile.png" alt="프로필 이미지" onClick={() => navigate('/profile')} />
            </Header>
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

            <BottomNavBar>
                <NavBarIcon src="/images/home.png" alt="Home" onClick={() => navigate('/first')} />
                <NavBarIcon src="/images/circle.png" alt="Circle" onClick={() => navigate('/circle')} />
                <NavBarIcon src="/images/link.png" alt="Link" onClick={() => navigate('/team')} />
                <NavBarIcon2 src="/images/profileicon.png" alt="Profile" onClick={() => navigate('/profile')} />
            </BottomNavBar>
        </Container>
    );
}

export default ProfilePage;

// Styled-components
const Container = styled.div`
    background-color: black;
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 120px; /* 수정된 부분: 하단 네비게이션 바와 스크롤을 위한 여백 증가 */
    position: relative;
`;

const Header = styled.div`
    font-size: 24px;
    color: #948dce;
    font-weight: bold;
    width: 100%;
    border-bottom: 1px solid #333;
    padding-bottom: 5px;
    padding-left: 30px;
    padding-top: 60px;
    padding-right: 30px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 25px;
    height: 20px;
    cursor: pointer;
    padding: 2px;
    padding-left: 15px;
`;

const Line = styled.div`
    width: 100%;
    height: 2px;
    background-color: white;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    color: #948dce;
    font-weight: bold;
    margin-bottom: 7px;
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #948dce;
    margin-right: 15px;
    cursor: pointer;
    margin-bottom: 7px;
`;

const ContentArea = styled.div`
    width: 800px;
    max-width: 90%;
    margin-top: 0px;
    padding: 20px;
    overflow-y: auto;
    flex-grow: 1;
    padding-bottom: 80px; /* 수정된 부분: 콘텐츠 하단 여백 추가 */
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
    &:last-of-type {
        border-bottom: none;
        padding-bottom: 0;
        margin-bottom: 0;
    }
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
    border: 2px solid #948dce;
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
    padding-left: 20px;
`;

const BottomNavBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #1a1a1a;
    border-top: 1px solid #333;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    padding-bottom: env(safe-area-inset-bottom);
`;

const NavBarIcon = styled.img`
    width: 70px;
    height: 70px;
    cursor: pointer;
    filter: invert(1);
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`;

const NavBarIcon2 = styled.img`
    width: 65px;
    height: 65px;
    margin-top: 10px;
    cursor: pointer;
    filter: invert(1);
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`;
