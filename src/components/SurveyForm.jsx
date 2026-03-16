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
    optional: true,
  },
  {
    id: "q2",
    label: "2. What technology trend is overhyped?",
    placeholder: "Type your answer here...",
    optional: true,
  },
  {
    id: "q3",
    label: "3. What leadership lesson took you the longest to learn?",
    placeholder: "Type your answer here...",
    optional: true,
  },
  {
    id: "q4",
    label: "4. What one capability must banks master in the next decade?",
    placeholder: "Type your answer here...",
    optional: true,
  },
  {
    id: "q5",
    label: "5. What advice would you give your younger self entering tech?",
    placeholder: "Type your answer here...",
    optional: true,
  },
];

function encode(data) {
  return new URLSearchParams(data).toString();
}

export default function SurveyForm({ finishSurvey, setSurveyProgress }) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (event) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: event.target.value,
    }));
  };

  const handleNext = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "to-talks-survey",
          ...answers,
        }),
      });

      setSurveyProgress(100);
      finishSurvey();
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was a problem submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="step-meta">
        <span className="step-counter">
          Question {step + 1} of {questions.length}
        </span>
        <span className="step-optional">Optional</span>
      </div>

      <h1 className="title">T&amp;O Talks Survey</h1>
      <p className="subtitle">
        Share your thoughts on technology, leadership, and the future of AI.
      </p>

      <form
        name="to-talks-survey"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="survey-form"
      >
        <input type="hidden" name="form-name" value="to-talks-survey" />

        <label className="question-label" htmlFor={currentQuestion.id}>
          {currentQuestion.label}
        </label>

        <textarea
          id={currentQuestion.id}
          name={currentQuestion.id}
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
            disabled={step === 0 || isSubmitting}
          >
            Back
          </button>

          {!isLastStep ? (
            <button
              type="button"
              className="button"
              onClick={handleNext}
              disabled={isSubmitting}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
