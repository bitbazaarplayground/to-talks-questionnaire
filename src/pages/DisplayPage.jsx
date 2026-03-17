export default function DisplayPage() {
  return (
    <div className="display-page">
      <div className="display-layout">
        <section className="display-left">
          <div className="glass-panel">
            <div className="display-badge">Santander Technology</div>

            <h1 className="display-title">T&amp;O Talks</h1>

            <p className="display-subtitle">
              Scan the QR code to join the conversation on technology, AI, and
              the future of banking.
            </p>

            <div className="qr-card">
              <img
                src="/qr.svg"
                alt="QR code for T&O Talks survey"
                className="qr-image"
              />
            </div>

            <ol className="display-steps">
              <li>Scan the QR code with your phone</li>
              <li>Enter your name, role, and organisation</li>
              <li>Respond to any of the 5 questions</li>
              <li>Submit your response</li>
              <li>
                Visit our stand and take a picture for the T&amp;O Talks Wall of
                Fame
              </li>
            </ol>
          </div>
        </section>

        <section className="display-right">
          <img
            src="/background.jpg"
            alt="T&O Talks visual background"
            className="display-background-image"
          />
        </section>
      </div>
    </div>
  );
}
