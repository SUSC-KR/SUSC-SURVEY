import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParticipationSurvey from "./pages/ParticipationSurvey";
// import DemandSurvey from "./pages/DemandSurvey";
import Root from "./pages/root";
import Header from "./components/Header";
import Admin from "./pages/admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Root />} />
          {/* <Route path="/DemandSurvey" element={<DemandSurvey />} /> */}
          <Route
            path="/ParticipationSurvey"
            element={<ParticipationSurvey />}
          />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
