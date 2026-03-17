import { useState } from "react";

const questionData = [
  {
    id: "q1",
    answerField: "answer_1",
    questionField: "question_1",
    questionText: "What excites you most about technology right now?",
    label: "1. What excites you most about technology right now?",
    placeholder: "Type your answer here...",
  },
  {
    id: "q2",
    answerField: "answer_2",
    questionField: "question_2",
    questionText: "What technology trend is overhyped?",
    label: "2. What technology trend is overhyped?",
    placeholder: "Type your answer here...",
  },
  {
    id: "q3",
    answerField: "answer_3",
    questionField: "question_3",
    questionText: "What leadership lesson took you the longest to learn?",
    label: "3. What leadership lesson took you the longest to learn?",
    placeholder: "Type your answer here...",
  },
  {
    id: "q4",
    answerField: "answer_4",
    questionField: "question_4",
    questionText: "What one capability must banks master in the next decade?",
    label: "4. What one capability must banks master in the next decade?",
    placeholder: "Type your answer here...",
  },
  {
    id: "q5",
    answerField: "answer_5",
    questionField: "question_5",
    questionText: "What advice would you give your younger self entering tech?",
    label: "5. What advice would you give your younger self entering tech?",
    placeholder: "Type your answer here...",
  },
];

const surveySteps = [
  {
    id: "about",
    type: "details",
    title: "About you",
    fields: [
      {
        id: "name",
        label: "Name",
        placeholder: "Enter your name",
        required: true,
      },
      {
        id: "role",
        label: "Role",
        placeholder: "Enter your role",
        required: true,
      },
      {
        id: "organisation",
        label: "Organisation",
        placeholder: "Enter your organisation",
        required: true,
      },
    ],
  },
  ...questionData.map((question) => ({
    ...question,
    type: "question",
  })),
  {
    id: "review",
    type: "review",
    title: "Ready to submit",
  },
];

function encode(data) {
  return new URLSearchParams(data).toString();
}

export default function SurveyForm({ finishSurvey, setSurveyProgress }) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [answers, setAnswers] = useState({
    name: "",
    role: "",
    organisation: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    answer_5: "",
  });

  const currentStep = surveySteps[step];
  const isLastStep = step === surveySteps.length - 1;
  const isSecondLastStep = step === surveySteps.length - 2;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [name]: value,
    }));
  };

  const detailsStepIsValid = () => {
    return (
      answers.name.trim() !== "" &&
      answers.role.trim() !== "" &&
      answers.organisation.trim() !== ""
    );
  };

  const canContinue =
    currentStep.type === "details" ? detailsStepIsValid() : true;

  const updateProgress = (newStep) => {
    const progressValue = Math.round(
      ((newStep + 1) / surveySteps.length) * 100
    );
    setSurveyProgress(progressValue);
  };

  const handleNext = () => {
    if (!canContinue) return;
    if (step >= surveySteps.length - 1) return;

    const nextStep = step + 1;
    setStep(nextStep);
    updateProgress(nextStep);
  };

  const handleBack = () => {
    if (step === 0) return;

    const previousStep = step - 1;
    setStep(previousStep);
    updateProgress(previousStep);
  };

  const buildFormData = () => {
    return {
      "form-name": "to-talks-survey",
      name: answers.name,
      role: answers.role,
      organisation: answers.organisation,
      question_1: questionData[0].questionText,
      answer_1: answers.answer_1,
      question_2: questionData[1].questionText,
      answer_2: answers.answer_2,
      question_3: questionData[2].questionText,
      answer_3: answers.answer_3,
      question_4: questionData[3].questionText,
      answer_4: answers.answer_4,
      question_5: questionData[4].questionText,
      answer_5: answers.answer_5,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = buildFormData();

      if (import.meta.env.DEV) {
        console.log("Local test submission:", formData);
        setSurveyProgress(100);
        finishSurvey();
        return;
      }

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSurveyProgress(100);
      finishSurvey();
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was a problem submitting the survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="step-meta">
        <span className="step-counter">
          Step {step + 1} of {surveySteps.length}
        </span>
        <span className="step-optional">
          {currentStep.type === "details" ? "Required" : "Optional"}
        </span>
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

        {currentStep.type === "details" && (
          <>
            <h2 className="question-label">{currentStep.title}</h2>

            {currentStep.fields.map((field) => (
              <div key={field.id} className="details-field">
                <label className="field-label" htmlFor={field.id}>
                  {field.label}
                </label>

                <input
                  id={field.id}
                  name={field.id}
                  type="text"
                  className="input"
                  placeholder={field.placeholder}
                  value={answers[field.id]}
                  onChange={handleChange}
                  required={field.required}
                />
              </div>
            ))}
          </>
        )}

        {currentStep.type === "question" && (
          <>
            <label className="question-label" htmlFor={currentStep.id}>
              {currentStep.label}
            </label>

            <textarea
              id={currentStep.id}
              name={currentStep.answerField}
              className="input textarea"
              placeholder={currentStep.placeholder}
              value={answers[currentStep.answerField]}
              onChange={handleChange}
              rows="6"
            />
          </>
        )}

        {currentStep.type === "review" && (
          <>
            <h2 className="question-label">{currentStep.title}</h2>

            <div className="info-card">
              <p className="info-text">
                Please check your details below, then submit when ready.
              </p>
            </div>

            <div className="details-field">
              <span className="field-label">Name</span>
              <p className="review-value">{answers.name || "—"}</p>
            </div>

            <div className="details-field">
              <span className="field-label">Role</span>
              <p className="review-value">{answers.role || "—"}</p>
            </div>

            <div className="details-field">
              <span className="field-label">Organisation</span>
              <p className="review-value">{answers.organisation || "—"}</p>
            </div>
          </>
        )}

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
              disabled={!canContinue || isSubmitting}
            >
              {isSecondLastStep ? "Submit" : "Next"}
            </button>
          ) : (
            <button type="submit" className="button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Survey"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
