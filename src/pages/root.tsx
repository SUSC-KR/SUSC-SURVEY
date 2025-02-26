import { useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();

  // 설문 선택 시 해당 페이지로 이동
  const handleSurveySelection = (surveyPath: string) => {
    navigate(surveyPath);
  };

  return (
    <div>
      <h1>SUSC 설문모음</h1>
      <ul>
        <li>
          <button onClick={() => handleSurveySelection("/ParticipationSurvey")}>
            참여 설문
          </button>
        </li>
        <li>
          <button onClick={() => handleSurveySelection("/DemandSurvey")}>
            수요 설문
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Root;
