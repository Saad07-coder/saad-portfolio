
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/anton';
import '@fontsource-variable/inter-tight';
import '@fontsource/jetbrains-mono';
import './styles.css';

import Stage from './components/Stage';
import Chrome from './components/Chrome';

import { Director, SCENES } from './engine/director';
import { loadFrames, type FrameStore } from './engine/frames';

import Hero from './scenes/Hero';
import About from './scenes/About';
import Work from './scenes/Work';
import Journey from './scenes/Journey';
import Skills from './scenes/Skills';
import Awards from './scenes/Awards';
import Contact from './scenes/Contact';

function App() {
  const [director, setDirector] = useState<Director | null>(null);
  const [store, setStore] = useState<FrameStore | null>(null);
  const [active, setActive] = useState('hero');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const d = new Director();
    d.stop();
    setDirector(d);

    const unsubscribe = d.subscribe((states, y) => {
      const current =
        [...states].reverse().find((s) => s.enter > 0.02) ??
        states[0];

      setActive(current?.id ?? 'hero');

      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );

      setProgress(Math.min(1, Math.max(0, y / maxScroll)));
    });

    let cancelled = false;

    loadFrames((loaded, total) => {
      if (!cancelled) {
        setCounter(
          total > 0 ? Math.round((loaded / total) * 100) : 100,
        );
      }
    })
      .then((frameStore) => {
        if (cancelled) return;

        setStore(frameStore);
        setCounter(100);

        window.setTimeout(() => {
          if (cancelled) return;

          setLoading(false);
          d.start();
        }, 450);
      })
      .catch((error: unknown) => {
        console.error('Failed to load portfolio frames:', error);

        if (!cancelled) {
          setLoading(false);
          d.start();
        }
      });

    return () => {
      cancelled = true;
      unsubscribe();
      d.destroy();
    };
  }, []);

  const navigate = (id: string) => {
    director?.scrollTo(id);
  };

  function renderScene(id: string) {
    switch (id) {
      case 'hero':
        return <Hero />;

      case 'about':
        return <About />;

      case 'work':
        return <Work director={director} />;

      case 'journey':
        return <Journey />;

      case 'skills':
        return <Skills />;

      case 'awards':
        return <Awards />;

      case 'contact':
        return <Contact />;

      default:
        return null;
    }
  }

  return (
    <>
      <Stage store={store} />

      <div className="layer-back" aria-hidden="true">
        <div className="back-name">SAAD</div>
        <div className="back-glow" />
      </div>

      <div className="layer-front" aria-hidden="true">
        <div className="front-decoration">
          DATA ✦ INSIGHT ✦ IMPACT ✦
        </div>
      </div>

      <Chrome
        active={active}
        progress={progress}
        onNavigate={navigate}
      />

      <main>
        {SCENES.map((scene) => (
          <div
            key={scene.id}
            className={`scene-wrap scene-wrap-${scene.id}`}
            style={{
              height: scene.id === 'skills' ? 'auto' : `${scene.height}vh`,
              minHeight: scene.id === 'skills' ? '100vh' : undefined,
            }}
            data-scene={scene.id}
          >
            {renderScene(scene.id)}
          </div>
        ))}
      </main>

      {loading && (
        <div className="preloader">
          <div className="preload-half top" />
          <div className="preload-half bottom" />

          <div className="preload-content">
            <small>SAAD MIRZA · PORTFOLIO</small>

            <strong>{String(counter).padStart(3, '0')}</strong>

            <small>LOADING THE EXPERIENCE</small>

            <div className="preload-bar">
              <i style={{ width: `${counter}%` }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
