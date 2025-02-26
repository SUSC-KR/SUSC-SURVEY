import { useState } from "react";
import FormSection from "@components/FormSection";
import Question from "@components/Question";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DemandSurvey: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [email, setEmail] = useState("");

  // 설문 제목과 내용. 설문용도에 맞게 변경하기!
  const [surveyTitle] = useState("SUSC 2024 Winter 수요조사");
  const [surveyDescription] = useState(`
SUSC 2024 Winter 수요 조사

안녕하세요, 대학교류단체 SUSC(에스유에스씨)입니다.

지난 SUSC 2024 Summer 행사에 20개의 대학에서 많은 대학생 분들이 참여해주셨는데요. 성원에 힘입어 이번 2024학년도 겨울 방학을 맞이하여 더 큰 규모의 방학 교류 행사를 진행하려고 합니다.

진행하기에 앞서, 여러분들이 어떤 활동을 하고 싶어 하시는지 알아보기 위해 수요 조사를 진행합니다. 양질의 활동을 제공해 드릴 수 있도록 다양한 의견을 주시면 감사하겠습니다!

이 양식은 모든 응답자의 이메일을 자동으로 수집합니다.
    `);

  console.log(surveyDescription);

  // 이구간을 자유롭게 수정하기!
  const sections = [
    {
      title: "답변자 정보",
      description: `### 답변자 기본 정보
  이름, 전화번호, 소속 학교 등 기본 정보를 입력해주세요. 개인 참여일 경우 "기타"에 본인 학교 이름을 적어주세요.`,
      questions: [
        { id: "name", type: "text", label: "이름" },
        {
          id: "phone",
          type: "text",
          label: "전화번호",
          placeholder: "000-0000-0000 형식으로 넣어주세요.",
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
      title: "관심 있는 분야 선택",
      description: `### 관심 있는 분야
  공부해보고 싶은 분야를 모두 선택해주세요. '관심 없음' 또는 '기타'로 추가적인 관심 분야를 적을 수 있습니다.`,
      questions: [
        {
          id: "fieldInterest",
          type: "checkbox",
          label: "공부해보고 싶은 분야",
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
            "UI/UX",
            "기타",
          ],
        },
      ],
    },
    {
      title: "관심 있는 프로그래밍 언어 선택",
      description: `### 관심 있는 프로그래밍 언어
  공부해보고 싶은 프로그래밍 언어를 모두 선택해주세요. '관심 없음' 또는 '기타'로 추가적인 언어를 적을 수 있습니다.`,
      questions: [
        {
          id: "languageInterest",
          type: "checkbox",
          label: "공부해보고 싶은 프로그래밍 언어",
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
      ],
    },
    {
      title: "스터디 외 활동",
      description: `### SUSC에서 직접 활동을 만들다면?
  SUSC에서는 운영진에서 만든 스터디 외에도 여러분들이 직접 여러 활동을 만들어 진행할 수 있어요! 스터디, 프로젝트, 공모전, 해커톤 등 여러 활동을 자유롭게 제안해주세요.`,
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
      title: "OT & 네트워킹 파티 참여 여부",
      description: `### OT & 네트워킹 파티 참여 여부
  SUSC 2024 Winter 활동을 본격적으로 시작하기 전에 1/11에 OT 및 네트워킹 파티가 진행될 예정입니다. 오프라인 및 온라인 모두 참여 가능합니다.`,
      questions: [
        {
          id: "otParticipation",
          type: "radio",
          label: "OT에 참여하실 의향이 있으신가요?",
          options: [
            "예, 오프라인으로 참여하겠습니다.",
            "예, 온라인으로 참여하겠습니다.",
            "아니오",
          ],
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

export default DemandSurvey;
