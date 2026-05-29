import { useCallback, useEffect, useRef, useState } from "react";
import { assets } from "../data/assetManifest";

export interface SoundController {
  enabled: boolean;
  toggleSound: () => void;
  play: (volume?: number) => void;
}

const storageKey = "portfolio-sound-enabled";

function getInitialEnabled() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.localStorage.getItem(storageKey) !== "false";
}

export function useSound(): SoundController {
  const [enabled, setEnabled] = useState(getInitialEnabled);
  const contextRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const loadingRef = useRef<Promise<void> | null>(null);

  const ensureContext = useCallback(() => {
    if (!contextRef.current) {
      contextRef.current = new AudioContext();
    }

    return contextRef.current;
  }, []);

  const load = useCallback(async () => {
    if (bufferRef.current || loadingRef.current) {
      return loadingRef.current;
    }

    loadingRef.current = fetch(assets.audio.click)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => ensureContext().decodeAudioData(arrayBuffer))
      .then((buffer) => {
        bufferRef.current = buffer;
      })
      .catch(() => {
        loadingRef.current = null;
      });

    return loadingRef.current;
  }, [ensureContext]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, String(enabled));
  }, [enabled]);

  useEffect(() => {
    const unlock = () => {
      const context = ensureContext();
      if (context.state === "suspended") {
        void context.resume();
      }
      void load();
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [ensureContext, load]);

  const play = useCallback(
    (volume = 0.3) => {
      if (!enabled) {
        return;
      }

      const context = ensureContext();
      if (context.state === "suspended") {
        void context.resume();
      }

      if (!bufferRef.current) {
        void load();
        return;
      }

      const source = context.createBufferSource();
      const gain = context.createGain();
      gain.gain.value = volume;
      source.buffer = bufferRef.current;
      source.connect(gain);
      gain.connect(context.destination);
      source.start();
    },
    [enabled, ensureContext, load],
  );

  return {
    enabled,
    toggleSound: () => setEnabled((current) => !current),
    play,
  };
}
