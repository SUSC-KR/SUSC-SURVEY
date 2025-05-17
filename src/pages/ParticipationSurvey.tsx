import { useState } from "react";
import FormSection from "./../components/FormSection";
import Question from "./../components/Question";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ParticipationSurvey: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [email, setEmail] = useState("");

  // 설문 제목과 내용. 설문용도에 맞게 변경하기! (todo)
  const [surveyTitle] = useState("SUSC 2025 Summer 참가신청");
  const [surveyDescription] = useState(`
### 안녕하세요, 대학교류단체 **SUSC(에스유에스씨)** 입니다.  

지난 **SUSC 2024 Summer/Winter** 행사에 많은 관심과 참여를 보내주신 여러분께 감사드립니다.  
올해도 여러분의 의견을 바탕으로 **SUSC 2025 Summer 프로그램**을 준비하고자 합니다.  

**현업 멘토와 함께하는 스터디 및 프로젝트**를 통해 대학생 여러분이 실질적인 경험을 쌓고, 서로의 지식과 경험을 공유할 수 있는 기회를 제공할 예정입니다.  
또한, 다양한 전공과 배경을 가진 참가자들과의 교류를 통해 폭넓은 네트워크를 형성할 수 있는 장을 마련하고자 합니다.  

여러분의 적극적인 참여가 더 의미 있는 프로그램을 만들어갑니다.  
많은 관심과 신청 부탁드립니다!  

### 개설예정 스터디
| 이름   | 소속                        | 강의명                                              | 일정                  |
|--------|-----------------------------|-----------------------------------------------------|-----------------------|
| 김민상 | 와이즈넛                      | 알고리즘 초급                                      | 주 1회, 2시간, 토요일, 5주 |
| 김민상 | 와이즈넛                      | 알고리즘 중급                                      | 주 1회, 2시간, 일요일, 5주 |
| 임근석 | 복지 24                      | MCP(Model Context Protocol)로 직접 느껴보는 신기술 탐험      | 주 1회, 3시간, 1주 과정 |
| 조민성 | 안랩클라우드메이트             | GitHub Actions으로 나만의 블로그 만들기 | 1회, 3시간, 1주 과정 |
| 정규석 | WhaTap Labs                  | 리눅스/애플리케이션 모니터링 방법                  | 주 1회, 2시간, 4주 과정 |
| 정미르 | 안랩                          | 백엔드? 그냥 Django로 시작하면 돼                  | 주 1회, 2시간, 4주 과정 |
| 추영욱 | arxtrus                 | 금융 데이터를 활용한 시계열 데이터 분석            | 주 1회, 2시간, 5주 과정 |
| 추영욱 | arxtrus                 | Apache Airflow를 활용한 데이터 파이프라인 구축     | 주 1회, 2시간, 6주 과정 |
| 한상곤 | 부산대학교 교수, Microsoft MVP | 체스 엔진을 활용한 탐색 알고리즘 이해와 구현                            | 시간 미정              |
| 황제연 | SUSC                         | 자바 성능 튜닝 이야기 (Book Study)                  | 시간 미정            |
| 임상빈 | 그로메트릭                    | 도커 컨테이너를 활용한 웹 서버 배포                | 주 1회, 2시간, 1주 과정         |

*현재 자세한 스터디 일정은 확정되지 않았으며, 추후 픽스되는 대로 공유드릴 예정입니다.  
각 스터디에 대한 정보와 일정은 [SUSC 공식 홈페이지](https://susc.kr/study)를 통해 확인하실 수 있습니다.

감사합니다.  
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
          label: "* 소속 학교 (ex: OO대학교 || OOIST)",
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
            "금융 데이터를 활용한 시계열 데이터 분석",
            "도커 컨테이너를 활용한 웹 서버 배포",
            "리눅스/애플리케이션 모니터링 방법",
            "백엔드? 그냥 Django로 시작하면 돼",
            "알고리즘 초급",
            "알고리즘 중급",
            "자바 성능 튜닝 이야기 (Book Study)",
            "Apache Airflow를 활용한 데이터 파이프라인 구축",
            "C#으로 만드는 물리엔진",
            "MCP(Model Context Protocol)로 직접 느껴보는 신기술 탐험",
            "Hugo와 GitHub Action을 활용한 개인 블로그 개발 및 배포",
          ],
        },
        {
          id: "studyMotivation1",
          type: "long-text",
          label: "[선택 1]스터디 지원 동기 (1000자 내외)",
        },
        {
          id: "studyGoals1",
          type: "long-text",
          label: "[선택 1]스터디를 통해 얻고자 하는 점 (1000자 내외)",
        },
        {
          id: "studyMotivation2",
          type: "long-text",
          label: "[선택 2]스터디 지원 동기 (1000자 내외)",
        },
        {
          id: "studyGoals2",
          type: "long-text",
          label: "[선택 2]스터디를 통해 얻고자 하는 점 (1000자 내외)",
        },
        {
          id: "baekjoonId",
          type: "text",
          label: "[알고리즘 스터디 선택자 한정] 백준 아이디",
        },
        {
          id: "otherStudyPlan",
          type: "long-text",
          label:
            "자바 성능 튜닝 이야기 (Book Study) 처럼 SUSC에서 여러분들이 개설해서 진행해보고 싶은 스터디가 있다면 자유롭게 작성해주세요.",
        },
      ],
    },
    {
      title: "스터디 외 활동 참여 조사",
      description: `### 스터디 외에 참여하고 싶은 활동이 있다면 선택해주세요.
      
오프라인 OT는 스터디 시작 전에 참가자들이 모여 다양한 교류를 하는 활동입니다. 주로 서울 2호선 라인 어딘가에서 열립니다.  

성과공유포럼은 자신이 진행한 프로젝트를 부산의 SW 성과공유포럼에서 발표하는 활동입니다. 1박 숙박비가 지원됩니다.  

SUSCON은 오프라인 OT와 마찬가지로 SUSC 참가자들이 스터디 종료 후 정보를 공유하고 네트워킹을 하는 활동입니다.  

주말 모각코는 '모여서 각자 코딩'의 줄임말로, 수요가 있다면 서울과 부산 지역에서 열 예정입니다.  

Geeknews 라디오는 긱뉴스에 올라오는 이슈들을 매주 톺아보며, 관련 이야기나 이슈들을 곁들여 자유롭게 토론하는 콘텐츠입니다.
`,
      questions: [
        {
          id: "participationType",
          type: "checkbox",
          label: "참여할 활동",
          options: [
            "오프라인 OT",
            "성과공유포럼",
            "SUSCON(성과공유회)",
            "주말 모각코",
            "Geeknews 라디오",
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
          options: ["서울(홍대, 강남)", "부산(서면)", "기타"],
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

    if (!formData.school || formData.school.trim() === "") {
    alert("소속 학교를 입력해주세요.");
    return;
  }

    const formId = "ParticipationSurvey2025s"; // 설문종류+년도+시즌s/w (todo)
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

export default ParticipationSurvey;
