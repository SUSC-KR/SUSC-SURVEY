import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import devtools from "devtools-detect";

const Root = () => {
  const [devToolsOpen, setDevToolsOpen] = useState(false);

  useEffect(() => {
    const detectDevTools = () => {
      if (devtools.isOpen) {
        setDevToolsOpen(true);
        return;
      }

      if (window.outerWidth - window.innerWidth > 160) {
        setDevToolsOpen(true);
      } else {
        setDevToolsOpen(false);
      }
    };

    window.addEventListener("resize", detectDevTools);

    return () => {
      window.removeEventListener("resize", detectDevTools);
    };
  }, []);

  return (
    <>
      <h1>SUSC 설문모음</h1>
      <ul>
        {/* <li className="survey-link">
          <Link to="/DemandSurvey">수요 조사 참여하기</Link>
        </li> */}

        <li className="survey-link">
          <Link to="/ParticipationSurvey">참가신청 폼 작성하기</Link>
        </li>

        {devToolsOpen && (
          <li className="survey-link">
            <Link to="/admin">관리자 페이지</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Root;
