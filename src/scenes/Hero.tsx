import { profile } from '../data';

export default function Hero() {
  return (
    <section
      id="hero"
      data-scene="hero"
      className="scene hero"
    >
      <div className="sticky">
        <div className="hero-copy reveal">
          <p className="eyebrow">
            (01) — Hello, I'm <b>{profile.name}</b>
          </p>

          <h1>
            DATA
            <br />
            <span>ANALYST.</span>
          </h1>

          <p className="hero-tagline">
            {profile.tagline.map((t, i) => (
              <span key={i}>{t} </span>
            ))}
          </p>

          <div className="actions">
            <a
              className="button button-red"
              data-cursor="Go"
              href="#work"
            >
              See my work ↘
            </a>

            <a
              className="button button-outline"
              data-cursor="PDF"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              Download résumé ↗
            </a>
          </div>
        </div>

        <div className="hero-ghost" aria-hidden="true">
          SAAD
        </div>

        {/* Static photo instead of video */}
        <div className="hero-photo">
          <img
            src="./image/saad.png"
            alt="Saad Mirza"
          />
        </div>

        <span className="scroll-hint">
          SCROLL TO EXPLORE ↓
        </span>
      </div>
    </section>
  );
}