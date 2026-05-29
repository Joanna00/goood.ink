import { useEffect, useRef } from "react";

export type PixelIconKind =
  | "sun"
  | "moon"
  | "speaker"
  | "muted"
  | "email"
  | "heart"
  | "top"
  | "lock"
  | "close";

interface PixelIconProps {
  kind: PixelIconKind;
  size?: number;
  color?: string;
  className?: string;
}

const paths: Record<PixelIconKind, number[][]> = {
  sun: [
    [4, 0],
    [4, 1],
    [1, 1],
    [7, 1],
    [3, 3],
    [4, 3],
    [5, 3],
    [3, 4],
    [4, 4],
    [5, 4],
    [3, 5],
    [4, 5],
    [5, 5],
    [1, 7],
    [7, 7],
    [4, 7],
    [4, 8],
  ],
  moon: [
    [5, 0],
    [6, 0],
    [4, 1],
    [5, 1],
    [3, 2],
    [4, 2],
    [3, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 6],
    [2, 4],
    [2, 5],
    [3, 6],
    [4, 7],
    [5, 7],
  ],
  speaker: [
    [1, 3],
    [2, 3],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [1, 4],
    [2, 4],
    [5, 2],
    [6, 3],
    [6, 4],
    [5, 5],
    [7, 1],
    [8, 3],
    [8, 4],
    [7, 6],
  ],
  muted: [
    [1, 3],
    [2, 3],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [1, 4],
    [2, 4],
    [5, 2],
    [6, 3],
    [7, 4],
    [8, 5],
    [8, 2],
    [7, 3],
    [6, 4],
    [5, 5],
  ],
  email: [
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
    [7, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 5],
    [5, 5],
    [6, 4],
    [7, 3],
    [1, 6],
    [2, 6],
    [3, 6],
    [4, 6],
    [5, 6],
    [6, 6],
    [7, 6],
  ],
  heart: [
    [2, 2],
    [3, 2],
    [5, 2],
    [6, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [7, 3],
    [2, 4],
    [3, 4],
    [4, 4],
    [5, 4],
    [6, 4],
    [3, 5],
    [4, 5],
    [5, 5],
    [4, 6],
  ],
  top: [
    [4, 1],
    [3, 2],
    [4, 2],
    [5, 2],
    [2, 3],
    [4, 3],
    [6, 3],
    [4, 4],
    [4, 5],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],
  ],
  lock: [
    [3, 1],
    [4, 1],
    [5, 1],
    [2, 2],
    [6, 2],
    [2, 3],
    [6, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
    [5, 4],
    [6, 4],
    [7, 4],
    [1, 5],
    [4, 5],
    [7, 5],
    [1, 6],
    [3, 6],
    [4, 6],
    [5, 6],
    [7, 6],
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],
    [7, 7],
  ],
  close: [
    [2, 2],
    [6, 2],
    [3, 3],
    [5, 3],
    [4, 4],
    [3, 5],
    [5, 5],
    [2, 6],
    [6, 6],
  ],
};

export function PixelIcon({ kind, size = 24, color = "currentColor", className }: PixelIconProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const draw = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * ratio;
      canvas.height = size * ratio;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, size, size);
      context.imageSmoothingEnabled = false;
      context.fillStyle = color === "currentColor" ? getComputedStyle(canvas).color : color;
      const cell = Math.max(2, Math.floor(size / 10));
      const offset = Math.floor((size - cell * 9) / 2);

      for (const [x, y] of paths[kind]) {
        context.fillRect(offset + x * cell, offset + y * cell, cell, cell);
      }
    };

    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    draw();

    return () => observer.disconnect();
  }, [color, kind, size]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
