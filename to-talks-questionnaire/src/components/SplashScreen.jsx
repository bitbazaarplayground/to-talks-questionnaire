export default function SplashScreen({ startSurvey }) {
  return (
    <div className="container">
      <div className="badge">T&amp;O Talks</div>

      <h1 className="title">Technology, AI, and the Future</h1>

      <p className="subtitle">
        Scan, respond, and share your perspective with Santander Technology.
      </p>

      <div className="info-card">
        <p className="info-text">5 quick questions</p>
        <p className="info-text">Less than 2 minutes</p>
        <p className="info-text">Designed for conference attendees</p>
      </div>

      <button className="button" onClick={startSurvey}>
        Start Survey
      </button>
    </div>
  );
}
