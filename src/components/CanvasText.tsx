import { useEffect, useRef } from "react";

interface CanvasTextProps {
  text: string;
  width: number;
  height: number;
  fontSize: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
  align?: CanvasTextAlign;
  className?: string;
}

export function CanvasText({
  text,
  width,
  height,
  fontSize,
  color = "currentColor",
  fontFamily = "Public Pixel, Pixel, Inter, sans-serif",
  fontWeight = 400,
  align = "left",
  className,
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let mounted = true;

    const draw = () => {
      if (!mounted || !canvasRef.current) {
        return;
      }

      const canvas = canvasRef.current;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.imageSmoothingEnabled = false;
      context.fillStyle = color === "currentColor" ? getComputedStyle(canvas).color : color;
      context.textAlign = align;
      context.textBaseline = "middle";
      context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      const x = align === "center" ? width / 2 : align === "right" ? width : 0;
      context.fillText(text, x, height / 2 + 1);
    };

    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if ("fonts" in document) {
      void document.fonts.ready.then(draw);
    }
    draw();

    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, [align, color, fontFamily, fontSize, fontWeight, height, text, width]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

interface PixelLogoProps {
  inverted?: boolean;
}

export function PixelLogo({ inverted = false }: PixelLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const width = 350;
    const height = 40;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const draw = () => {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.imageSmoothingEnabled = false;
      context.font = "400 26px Public Pixel, Pixel, Inter, sans-serif";
      context.textBaseline = "middle";
      context.fillStyle = inverted ? "#ffffff" : "#111111";
      context.fillText("HARRY ", 0, 21);
      context.fillRect(164, 2, 102, 34);
      context.fillStyle = inverted ? "#111111" : "#ffffff";
      context.fillText("DESI", 174, 21);
      context.fillStyle = inverted ? "#ffffff" : "#111111";
      context.fillText("GN", 278, 21);
    };

    if ("fonts" in document) {
      void document.fonts.ready.then(draw);
    }
    draw();
  }, [inverted]);

  return <canvas ref={canvasRef} className="pixel-logo" aria-label="HARRY DESIGN" />;
}
