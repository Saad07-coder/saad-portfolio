
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { projects } from '../data';
import { useDirector } from '../engine/hooks';
import type { Director } from '../engine/director';

function Visual({ type }: { type: string }) {
  return (
    <div className={`project-visual visual-${type}`}>
      <div className="visual-window">
        <div className="window-dots"><i /><i /><i /></div>

        {type === 'farm' ? (
          <>
            <div className="visual-title">SCHEME MATCH</div>
            <div className="gauge"><span>87%</span></div>
            <div className="visual-bars"><i /><i /><i /></div>
          </>
        ) : type === 'risk' ? (
          <>
            <div className="visual-title">DEFAULT RISK</div>
            <div className="heatmap">
              {Array.from({ length: 36 }, (_, i) => <i key={i} />)}
            </div>
          </>
        ) : (
          <>
            <div className="visual-title">RETENTION SIGNALS</div>
            <div className="bubble">At-risk segment</div>
            <div className="bubble short">+12% retention</div>
            <div className="visual-bars"><i /><i /><i /></div>
          </>
        )}
      </div>
    </div>
  );
}


export default function Work({ director }: { director: Director | null }) {
  const cardsRef = useRef<HTMLElement[]>([]);
  const counterRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card, i) => {
      gsap.set(card, {
        position: 'absolute',
        inset: 0,
        y: i === 0 ? 0 : 45,
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 0.97,
        visibility: i === 0 ? 'visible' : 'hidden',
        pointerEvents: i === 0 ? 'auto' : 'none',
      });
    });

    return () => {
      gsap.killTweensOf(cards);
    };
  }, []);

  useDirector(director, (states) => {
    const state = states.find((s) => s.id === 'work');
    if (!state) return;

    const cards = cardsRef.current.filter(Boolean);
    const count = cards.length;

    if (!count) return;

    const p = Math.max(0, Math.min(0.99999, state.p));
    const progress = p * count;
    const current = Math.min(count - 1, Math.floor(progress));
    const local = progress - current;

    // Transition begins near the end of each project's scroll interval.
    const transition = Math.max(
      0,
      Math.min(1, (local - 0.70) / 0.30),
    );

    const eased = transition * transition * (3 - 2 * transition);
    const next = Math.min(current + 1, count - 1);

    cards.forEach((card, i) => {
      if (!card) return;

      let opacity = 0;
      let y = 35;
      let scale = 0.97;
      let visibility: 'visible' | 'hidden' = 'hidden';
      let pointerEvents: 'auto' | 'none' = 'none';

      if (i === current) {
        opacity = current === count - 1 ? 1 : 1 - eased;
        y = current === count - 1 ? 0 : -25 * eased;
        scale = 1 - 0.025 * eased;
        visibility = 'visible';
        pointerEvents = transition < 0.5 ? 'auto' : 'none';
      }

      if (i === next && next !== current) {
        opacity = eased;
        y = 35 * (1 - eased);
        scale = 0.975 + 0.025 * eased;
        visibility = 'visible';
        pointerEvents = transition >= 0.5 ? 'auto' : 'none';
      }

      // At the beginning of the section, always show project one.
      if (p < 0.01) {
        opacity = i === 0 ? 1 : 0;
        y = i === 0 ? 0 : 35;
        scale = i === 0 ? 1 : 0.97;
        visibility = i === 0 ? 'visible' : 'hidden';
        pointerEvents = i === 0 ? 'auto' : 'none';
      }

      gsap.set(card, {
        opacity,
        y,
        scale,
        visibility,
        pointerEvents,
        zIndex: i === next || i === current ? 2 : 0,
        force3D: true,
      });
    });

    // Update project counter and progress indicator.
    const displayedProject =
      current < count - 1 && transition >= 0.5
        ? current + 1
        : current;

    if (counterRef.current) {
      counterRef.current.innerHTML =
        `${String(displayedProject + 1).padStart(2, '0')} <small>/ ${String(count).padStart(2, '0')}</small>`;
    }

    if (fillRef.current) {
      const percent = ((displayedProject + 1) / count) * 100;
      gsap.set(fillRef.current, { width: `${percent}%` });
    }
  });

  return (
    <section id="work" data-scene="work" className="scene work">
      <div className="work-grid" />

      <div className="sticky">
        <div className="work-topline">
          <div className="section-label">
            (03) — SELECTED WORK
          </div>

          <div className="work-progress">
            <strong className="work-counter" ref={counterRef}>
              01 <small>/ {String(projects.length).padStart(2, '0')}</small>
            </strong>

            <div className="work-progress-track">
              <div
                className="work-progress-fill"
                ref={fillRef}
              />
            </div>
          </div>
        </div>

        <div className="work-head">
          <h2>
            BUILT TO<br />
            <em>MAKE SENSE.</em>
          </h2>
        </div>

        <div className="project-list">
          {projects.map((p, i) => (
            <article
              className="project-card"
              key={p.number}
              ref={(el) => {
                cardsRef.current[i] = el as HTMLElement;
              }}
            >
              <div className="project-info">
                <small>{p.number} / {p.category}</small>

                <h3>{p.title}</h3>

                <p>{p.description}</p>

                <div className="chips">
                  {p.chips.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                >
                  View on GitHub ↗
                </a>
              </div>

              <Visual type={p.visual} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
