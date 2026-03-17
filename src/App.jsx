import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import SurveyForm from "./components/SurveyForm";
import ThankYou from "./components/ThankYou";
import DisplayPage from "./pages/DisplayPage";

function QuestionnaireFlow() {
  const [screen, setScreen] = useState("splash");
  const [progress, setProgress] = useState(0);

  return (
    <div className="app-background">
      <header className="header">
        <span className="brand">Santander Technology</span>
      </header>

      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {screen === "splash" && (
        <SplashScreen
          startSurvey={() => {
            setScreen("survey");
            setProgress(17);
          }}
        />
      )}

      {screen === "survey" && (
        <SurveyForm
          finishSurvey={() => setScreen("thankyou")}
          setSurveyProgress={setProgress}
        />
      )}

      {screen === "thankyou" && <ThankYou />}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QuestionnaireFlow />} />
      <Route path="/displaypage" element={<DisplayPage />} />
    </Routes>
  );
}
