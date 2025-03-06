import { useState } from "react";
import FormSection from "./../components/FormSection";
import Question from "./../components/Question";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ParticipationSurvey: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [email, setEmail] = useState("");

  // 설문 제목과 내용. 설문용도에 맞게 변경하기! (todo)
  const [surveyTitle] = useState("SUSC 2024 Winter 참여조사");
  const [surveyDescription] = useState(`
안녕하세요, 대학교류단체 **SUSC(에스유에스씨)** 입니다.

지난 **SUSC 2024 Summer 행사**에 보내주신 뜨거운 관심과 성원에 진심으로 감사드립니다.  
**2024학년도 겨울 방학**을 맞이하여 더욱 풍성하고 다양한 프로그램으로 구성된 대규모 스터디 교류 행사를 준비하게 되었습니다.

이번 행사는 대학생 여러분이 서로의 지식과 경험을 공유하며 교류를 통해 성장할 수 있는 특별한 기회가 될 것입니다.  
또한, 각 대학의 문화와 학문적 배경을 이해하고 폭넓은 네트워크를 형성할 수 있는 장을 제공할 예정입니다.

많은 학생들이 함께할수록 더 의미 있는 자리가 될 수 있기에, 여러분의 적극적인 참여와 관심을 부탁드립니다.

감사합니다.
    `);

  // 이구간을 자유롭게 수정하기! (todo)
  const sections = [
    {
      title: "답변자 정보",
      description: `### 참여자의 기본 정보를 입력해주세요.`,
      questions: [
        { id: "name", type: "text", label: "이름" },
        {
          id: "discordId",
          type: "text",
          label: "Discord ID (디스코드 채널 닉네임)",
        },
        {
          id: "school",
          type: "radio",
          label: "소속 학교",
          options: [
            "가천대학교",
            "경북대학교",
            "경희대학교",
            "금오공과대학교",
            "동국대학교",
            "동아대학교",
            "배재대학교",
            "서강대학교",
            "서울과학기술대학교",
            "서울여자대학교",
            "순천향대학교",
            "연세대학교",
            "우송대학교",
            "한국공학대학교",
            "한국외국어대학교",
            "한국해양대학교",
            "한남대학교",
            "한양대학교",
            "DGIST",
            "기타",
          ],
        },
      ],
    },
    {
      title: "스터디 참가 지원",
      description: `### 참여하고 싶은 스터디를 선택해주세요.\n\n최대 **2개** 까지 선택 가능합니다.`,
      questions: [
        {
          id: "studySelection",
          type: "checkbox",
          label: "희망 스터디",
          options: [
            "퀀트 스터디(SUSC ETF로 화성 갈끄니까잇)",
            "Apache Airflow 워크샵",
            "너는 전혀 Pythonic 하고있지 않아",
            "너의 논문은? AI part",
            "Chess Engine in Your Favorite Language",
            "자바+코틀린 나만의 앱 만들기",
            "리눅스 시스템 프로그래밍을 활용한 기초 OS 개념 잡기",
            "알고리즘 스터디 (초급)",
            "알고리즘 스터디 (중급)",
            "Figma 스터디",
            "기타",
          ],
        },
        {
          id: "studyMotivation1",
          type: "text",
          label: "[선택 1]스터디 지원 동기 (1000자 내외)",
        },
        {
          id: "studyGoals1",
          type: "text",
          label: "[선택 1]스터디를 통해 얻고자 하는 점 (1000자 내외)",
        },
        {
          id: "studyMotivation2",
          type: "text",
          label: "[선택 2]스터디 지원 동기 (1000자 내외)",
        },
        {
          id: "studyGoals2",
          type: "text",
          label: "[선택 2]스터디를 통해 얻고자 하는 점 (1000자 내외)",
        },
        {
          id: "baekjoonId",
          type: "text",
          label: "[알고리즘 스터디 선택자 한정] 백준 아이디",
        },
        {
          id: "otherStudyPlan",
          type: "text",
          label: "개설해서 진행해보고 싶은 스터디",
        },
      ],
    },
    {
      title: "스터디 외 활동 참여 조사",
      description: `### 스터디 외에 참여하고 싶은 활동이 있다면 선택해주세요.`,
      questions: [
        {
          id: "participationType",
          type: "checkbox",
          label: "참여할 활동",
          options: ["디코데이(OT)", "SUSCON", "주말 모각코"],
        },
        {
          id: "discordJoin",
          type: "radio",
          label: "디스코드 서버 참여",
          options: ["네", "아니오"],
        },
      ],
    },
    {
      title: "디코데이(OT) 참여 여부",
      description: `### 디코데이(OT)와 네트워킹 행사 참여 여부를 선택해주세요.`,
      questions: [
        {
          id: "otParticipation",
          type: "radio",
          label: "디코데이(OT) 참여 여부",
          options: [
            "예, 오프라인으로 참여하겠습니다.",
            "예, 온라인으로 참여하겠습니다.",
            "아니오",
          ],
        },
      ],
    },
    {
      title: "SUSCON 참여 여부",
      description: `### SUSCON 참여 여부를 선택해주세요.`,
      questions: [
        {
          id: "susconParticipation",
          type: "radio",
          label: "SUSCON 참여 여부",
          options: [
            "예, 오프라인으로 참여하겠습니다.",
            "예, 온라인으로 참여하겠습니다.",
            "아니오",
          ],
        },
      ],
    },
    {
      title: "주말 모각코 수요 조사",
      description: `### 주말 모각코 참여 가능 여부를 확인하기 위한 설문입니다.`,
      questions: [
        {
          id: "weekendStudyTime",
          type: "checkbox",
          label: "참여 가능한 시간대",
          options: ["토요일 오전", "토요일 오후", "일요일 오전", "일요일 오후"],
        },
        {
          id: "studyLocation",
          type: "checkbox",
          label: "참여 가능한 장소",
          options: ["서울(홍대, 강남)", "부산(서면)"],
        },
      ],
    },
  ];

  const handleChange = (id: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }

    const formId = "ParticipationSurvey2024W"; // 설문종류+년도+시즌 (todo)
    const checkUrl = `https://www.cpprhtn.com/form/forms/${encodeURIComponent(
      formId
    )}/answers/check-submitted`;
    const submitUrl = `https://www.cpprhtn.com/form/forms/${encodeURIComponent(
      formId
    )}/answers`;

    try {
      const checkResponse = await fetch(checkUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ email }),
      });

      if (!checkResponse.ok) {
        throw new Error("이메일 중복 확인 요청 실패");
      }

      const { isSubmitted } = await checkResponse.json();
      if (isSubmitted) {
        alert("이미 제출한 이메일입니다.");
        return;
      }

      const submissionData: any = { email, data: {} };

      sections.forEach((section) => {
        section.questions.forEach((q) => {
          submissionData.data[q.id] = formData[q.id] || null;
        });
      });

      const submitResponse = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(submissionData),
      });

      if (!submitResponse.ok) {
        throw new Error("설문 제출 요청 실패");
      }

      const { id } = await submitResponse.json();
      alert("제출이 완료되었습니다! 제출 ID: " + id);
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1>{surveyTitle}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {surveyDescription.trim()}
      </ReactMarkdown>
      <label>이메일</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {sections.map((section, index) => (
        <FormSection
          key={index}
          title={section.title}
          description={section.description}
        >
          {section.questions.map((q) => (
            <Question key={q.id} {...q} onChange={handleChange} />
          ))}
        </FormSection>
      ))}

      <button onClick={handleSubmit}>제출</button>
    </div>
  );
};

export default ParticipationSurvey;
