
import { awards, certifications } from '../data';

export default function Awards() {
  return (
    <section
      id="awards"
      data-scene="awards"
      className="scene awards"
    >
      <div className="sticky">
        <div className="section-label">
          (06) — Proof of work
        </div>

        <h2>
          SMALL WINS.
          <br />
          <em>REAL PROGRESS.</em>
        </h2>

        <div className="award-counters">
          {awards.map((a, i) => (
            <article
              className={`award-count count-${i}`}
              key={a.label}
            >
              <strong>
                {a.value}
                <i>{a.suffix}</i>
              </strong>

              <span>{a.label}</span>
            </article>
          ))}
        </div>

        <div className="cert-cylinder">
          <div className="cert-ring">
            {certifications.map((c, i) => (
              <article
                className={`cert-card cert-${i}`}
                style={
                  {
                    '--angle': `${i * 100}deg`,
                  } as React.CSSProperties
                }
                key={c.title}
              >
                <span>VERIFIED LEARNING</span>

                <h3>{c.title}</h3>

                <p>{c.issuer}</p>

                <b>✓</b>
              </article>
            ))}
          </div>
        </div>

        <p className="cert-note">
          A growing toolkit, built one skill at a time.
        </p>
      </div>
    </section>
  );
}
