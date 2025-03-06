import { Link } from "react-router-dom";

const Root = () => {
  return (
    <>
      <h1>SUSC 설문모음</h1>
      <ul>
        {/* <li>
          <Link to="/ParticipationSurvey">참여 설문</Link>
        </li> */}
        <li className="survey-link">
          <Link to="/DemandSurvey">수요 조사 참여하기</Link>
        </li>
      </ul>
    </>
  );
};

export default Root;
