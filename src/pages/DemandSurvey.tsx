import { useState } from "react";
import FormSection from "./../components/FormSection";
import Question from "./../components/Question";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DemandSurvey: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [email, setEmail] = useState("");

  // 설문 제목과 내용. 설문용도에 맞게 변경하기! (todo)
  const [surveyTitle] = useState("SUSC 2025 Summer 수요조사");
  const [surveyDescription] = useState(`
### 안녕하세요, 대학교류단체 SUSC(에스유에스씨)입니다.

지난 **SUSC 2024 Summer/Winter** 기간 동안 **20개 이상의 대학**에서 많은 대학생 분들이 참여해주셨습니다.

이번 여름방학 기간 동안 여러분들이 어떤 활동을 하고 싶어 하시는지 알아보기 위해 **수요 조사를 진행**하고자 합니다. 

양질의 활동을 제공해 드릴 수 있도록 다양한 의견을 주시면 감사하겠습니다!

이 수요조사를 바탕으로, **현업 멘토분들을 모셔** 스터디나 프로젝트를 기획할 예정입니다. 이를 통해 여러분들의 성장에 도움이 될 수 있는 기회를 제공하고자 합니다.
    `);

  // 이구간을 자유롭게 수정하기! (todo)
  const sections = [
    {
      title: "답변자 정보",
      description: `### 참여자의 기본 정보를 입력해주세요.
      디스코드 사용자 명 

![img](https://github.com/user-attachments/assets/14e9779a-f23f-4413-858a-1eb97fb94604)

`,
      questions: [
        { id: "name", type: "text", label: "이름" },
        {
          id: "discordId",
          type: "text",
          label: "Discord ID (디스코드 채널 닉네임)",
        },
        {
          id: "school",
          type: "text",
          label: "소속 학교 (ex: OO대학교)",
        },
      ],
    },
    {
      title: "관심 있는 분야 선택",
      description: `### SUSC에서 공부해보고 싶은 분야
  공부해보고 싶은 분야를 최대 3개 선택해주세요. 
  
  \`기타\` 를 체크하여 추가적인 관심 분야를 적을 수 있습니다.`,
      questions: [
        {
          id: "fieldInterest",
          type: "checkbox",
          label: "<공부해보고 싶은 분야>",
          options: [
            "관심없음",
            "보안",
            "인공지능",
            "웹 프론트엔드",
            "백엔드",
            "안드로이드 개발",
            "iOS 개발",
            "게임",
            "알고리즘",
            "인프라",
            "임베디드",
            "데이터 엔지니어링",
            "데이터베이스",
            "UI/UX",
            "기타",
          ],
        },
        {
          id: "languageInterest",
          type: "checkbox",
          label: "<공부해보고 싶은 프로그래밍 언어>",
          options: [
            "관심없음",
            "C++",
            "자바",
            "파이썬",
            "코틀린",
            "JS/TS",
            "러스트",
            "기타",
          ],
        },
        {
          id: "studyInterest",
          type: "radio",
          label: "<스터디를 직접 개설해보고 싶으신가요?>",
          options: ["아니오", "네"],
        },
      ],
    },
    {
      title: "스터디 외 활동",
      description: `### SUSC에서 직접 활동을 만들다면?
  SUSC에서는 운영진에서 만든 스터디 외에도 여러분들이 직접 여러 활동을 만들어 진행할 수 있어요! 스터디, 프로젝트, 공모전, 해커톤 등 여러 활동을 자유롭게 제안해주세요.
  
  예시) 모각코(모여서 각자 코딩), 맛집탐방 모임, 스키 다이스키 모임(스키장 파티) 등`,
      questions: [
        {
          id: "activityIdea",
          type: "text",
          label:
            "만약 여러분이 직접 만든다면 어떤 활동을 진행할지 간단하게 적어주세요.",
        },
      ],
    },
    {
      title: "듣고 싶은 세션",
      description: `### 듣고 싶은 세션 주제
  마이너한 주제도 괜찮으니 자유롭게 듣고 싶은 세션 주제를 적어주세요. 세션 발표는 외부 강연자님을 모집하여 진행할 예정입니다.`,
      questions: [
        {
          id: "sessionTopic",
          type: "text",
          label: "듣고 싶은 세션 주제를 자유롭게 적어주세요.",
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

    const formId = "DemandSurvey2025s"; // 설문종류+년도+시즌s/w (todo)
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
      <label>이메일 *</label>
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

export default DemandSurvey;
