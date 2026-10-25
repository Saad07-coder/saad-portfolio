
import { useEffect, useRef } from 'react';
import type { Director, SceneState } from './director';

export function useDirector(
  director: Director | null,
  callback: (states: SceneState[], y: number) => void,
) {
  const cb = useRef(callback);
  cb.current = callback;

  useEffect(() => {
    if (!director) return;

    const unsubscribe = director.subscribe((states, y) => {
      cb.current(states, y);
    });

    return () => {
      unsubscribe();
    };
  }, [director]);
}
