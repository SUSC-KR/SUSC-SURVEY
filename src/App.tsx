import { useState } from "react";
import FormSection from "./components/FormSection";
import Question from "./components/Question";

const App: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [email, setEmail] = useState("");
  const [surveyTitle] = useState("susc"); // 설문 제목입니다. 설문용도에 맞게 변경하기!

  // 이구간을 자유롭게 수정하기!
  const sections = [
    {
      title: "기본 정보",
      description: "먼저 기본 정보를 입력해주세요.",
      questions: [
        { id: "name", type: "text", label: "이름" },
        { id: "major", type: "text", label: "전공" },
        {
          id: "year",
          type: "radio",
          label: "학년",
          options: ["1", "2", "3", "4", "화석"],
        },
      ],
    },
    {
      title: "스터디 주제",
      description: "어떤 분야에 대한 스터디를 원하나요?",
      questions: [
        {
          id: "studyTopic",
          type: "checkbox",
          label: "관심 있는 스터디 주제",
          options: ["AI/ML", "웹 개발", "모바일 개발", "데이터 분석", "기타"],
        },
        { id: "otherTopic", type: "text", label: "기타 주제 (있다면 작성)" },
      ],
    },
    {
      title: "스터디 형태",
      description: "어떤 형태의 스터디를 선호하시나요?",
      questions: [
        {
          id: "studyFormat",
          type: "radio",
          label: "스터디 형식",
          options: ["팀 프로젝트", "개별 학습", "강의형 스터디", "Q&A/토론"],
        },
        {
          id: "studyDuration",
          type: "radio",
          label: "스터디 기간",
          options: ["1개월", "3개월", "6개월 이상"],
        },
      ],
    },
    {
      title: "시간대",
      description: "스터디 가능한 시간을 알려주세요.",
      questions: [
        {
          id: "availableTime",
          type: "checkbox",
          label: "스터디 가능한 시간대",
          options: ["월요일 오전", "화요일 오후", "수요일 저녁", "주말"],
        },
        {
          id: "studyFrequency",
          type: "radio",
          label: "스터디 빈도",
          options: ["주 1회", "주 2회", "주 3회 이상"],
        },
      ],
    },
    {
      title: "기타 의견",
      description: "기타 스터디와 관련된 의견이나 요청 사항을 작성해주세요.",
      questions: [{ id: "feedback", type: "text", label: "기타 의견" }],
    },
  ];

  const handleChange = (id: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }

    const submission: any = {
      설문타이틀: surveyTitle,
      이메일: email,
    };

    sections.forEach((section) => {
      submission[section.title] = {};
      section.questions.forEach((q) => {
        submission[section.title][q.label] = formData[q.id] || null;
      });
    });

    console.log("제출된 데이터:", JSON.stringify(submission, null, 2));

    try {
      const response = await fetch("/test/form-post", {
        // TODO: 제출주소 변경후 해당 주석 지우기
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        alert("제출이 완료되었습니다!");
      } else {
        alert("제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1>{surveyTitle}</h1>
      <label>이메일:</label>
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

export default App;
