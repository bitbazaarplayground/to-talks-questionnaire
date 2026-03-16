import { useState } from "react";

const questions = [
  {
    id: "role",
    label: "Your role or company",
    placeholder: "Enter your role or company",
    optional: true,
  },
  {
    id: "q1",
    label: "1. What excites you most about technology right now?",
    placeholder: "Type your answer here...",
  },
  {
    id: "q2",
    label: "2. What technology trend is overhyped?",
    placeholder: "Type your answer here...",
  },
  {
    id: "q3",
    label: "3. What leadership lesson took you the longest to learn?",
    placeholder: "Type your answer here...",
  },
  {
    id: "q4",
    label: "4. What one capability must banks master in the next decade?",
    placeholder: "Type your answer here...",
  },
  {
    id: "q5",
    label: "5. What advice would you give your younger self entering tech?",
    placeholder: "Type your answer here...",
  },
];

export default function SurveyForm({ finishSurvey, setSurveyProgress }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    role: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length - 1;

  const currentValue = answers[currentQuestion.id];
  const isOptional = currentQuestion.optional;
  const canContinue = isOptional || currentValue.trim() !== "";

  const handleChange = (event) => {
    setAnswers((currentAnswers) => {
      return {
        ...currentAnswers,
        [currentQuestion.id]: event.target.value,
      };
    });
  };

  const handleNext = () => {
    if (!canContinue) return;

    const nextStep = step + 1;
    setStep(nextStep);

    const progressValue = Math.round(((nextStep + 1) / questions.length) * 100);
    setSurveyProgress(progressValue);
  };

  const handleBack = () => {
    if (step === 0) return;

    const previousStep = step - 1;
    setStep(previousStep);

    const progressValue = Math.round(
      ((previousStep + 1) / questions.length) * 100
    );
    setSurveyProgress(progressValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canContinue) return;

    console.log("Survey answers:", answers);
    setSurveyProgress(100);
    finishSurvey();
  };

  return (
    <div className="container">
      <div className="step-meta">
        <span className="step-counter">
          Question {step + 1} of {questions.length}
        </span>
        <span className="step-optional">
          {isOptional ? "Optional" : "Required"}
        </span>
      </div>

      <h1 className="title">T&amp;O Talks Survey</h1>
      <p className="subtitle">
        Share your thoughts on technology, leadership, and the future of AI.
      </p>

      <form onSubmit={handleSubmit} className="survey-form">
        <label className="question-label" htmlFor={currentQuestion.id}>
          {currentQuestion.label}
        </label>

        <textarea
          id={currentQuestion.id}
          className="input textarea"
          placeholder={currentQuestion.placeholder}
          value={answers[currentQuestion.id]}
          onChange={handleChange}
          rows="6"
        />

        <div className="button-row">
          <button
            type="button"
            className="button button-secondary"
            onClick={handleBack}
            disabled={step === 0}
          >
            Back
          </button>

          {!isLastStep ? (
            <button
              type="button"
              className="button"
              onClick={handleNext}
              disabled={!canContinue}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="button" disabled={!canContinue}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
