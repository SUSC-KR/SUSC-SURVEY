import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ParticipationSurvey from "./pages/ParticipationSurvey";
import DemandSurvey from "./pages/DemandSurvey";
import Root from "./pages/root";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/ParticipationSurvey" element={<ParticipationSurvey />} />
        <Route path="/DemandSurvey" element={<DemandSurvey />} />
      </Routes>
    </Router>
  );
};

export default App;
