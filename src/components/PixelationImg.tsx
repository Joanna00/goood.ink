import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

interface PixelationImgProps {
  src: string;
  active?: boolean;
  pixelSize?: number;
  hoverPixelSize?: number;
  hoverDuration?: number;
  hoverToOriginal?: boolean;
  desaturateUntilHover?: boolean;
  maskColor?: string;
  maskOpacity?: number;
  objectFit?: "cover" | "contain";
  maxPixelRatio?: number;
  className?: string;
}

const easeOut = (progress: number) => 1 - Math.pow(1 - progress, 3);

export function PixelationImg({
  src,
  active = false,
  pixelSize = 80,
  hoverPixelSize = 1,
  hoverDuration = 500,
  hoverToOriginal = true,
  desaturateUntilHover = true,
  maskColor = "#111111",
  maskOpacity = 0.6,
  objectFit = "cover",
  maxPixelRatio = 2,
  className,
}: PixelationImgProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pixelRef = useRef(pixelSize);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    [],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const rect = entry.contentRect;
      setSize({ width: Math.max(1, rect.width), height: Math.max(1, rect.height) });
    });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });

    resizeObserver.observe(wrapper);
    intersectionObserver.observe(wrapper);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setLoaded(false);
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => {
      imageRef.current = image;
      setLoaded(true);
    };
    image.src = src;
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !loaded || !visible) {
      return;
    }

    const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
    const width = Math.ceil(size.width);
    const height = Math.ceil(size.height);
    const target = active && hoverToOriginal ? hoverPixelSize : pixelSize;
    const start = pixelRef.current;
    const duration = reduceMotion ? 120 : hoverDuration;
    const startedAt = performance.now();
    const smallCanvas = document.createElement("canvas");
    const smallContext = smallCanvas.getContext("2d");
    const context = canvas.getContext("2d");

    if (!context || !smallContext) {
      return;
    }

    const draw = (currentPixelSize: number) => {
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.imageSmoothingEnabled = currentPixelSize <= 1;
      context.filter = desaturateUntilHover && !active ? "grayscale(1) contrast(1.05)" : "none";

      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = width / height;
      let sx = 0;
      let sy = 0;
      let sw = image.naturalWidth;
      let sh = image.naturalHeight;

      if (objectFit === "cover" ? imageRatio > canvasRatio : imageRatio < canvasRatio) {
        sw = image.naturalHeight * canvasRatio;
        sx = (image.naturalWidth - sw) / 2;
      } else {
        sh = image.naturalWidth / canvasRatio;
        sy = (image.naturalHeight - sh) / 2;
      }

      if (currentPixelSize <= 1) {
        context.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
      } else {
        const smallWidth = Math.max(1, Math.ceil(width / currentPixelSize));
        const smallHeight = Math.max(1, Math.ceil(height / currentPixelSize));
        smallCanvas.width = smallWidth;
        smallCanvas.height = smallHeight;
        smallContext.clearRect(0, 0, smallWidth, smallHeight);
        smallContext.imageSmoothingEnabled = true;
        smallContext.drawImage(image, sx, sy, sw, sh, 0, 0, smallWidth, smallHeight);
        context.imageSmoothingEnabled = false;
        context.drawImage(smallCanvas, 0, 0, smallWidth, smallHeight, 0, 0, width, height);
      }

      context.filter = "none";
    };

    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min(1, (now - startedAt) / duration);
      const eased = easeOut(progress);
      const current = start + (target - start) * eased;
      pixelRef.current = current;
      draw(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    active,
    desaturateUntilHover,
    hoverDuration,
    hoverPixelSize,
    hoverToOriginal,
    loaded,
    maxPixelRatio,
    objectFit,
    pixelSize,
    reduceMotion,
    size.height,
    size.width,
    visible,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={className ? `pixelation-img ${className}` : "pixelation-img"}
      style={
        {
          "--mask-color": maskColor,
          "--mask-opacity": active ? maskOpacity : 0,
        } as CSSProperties
      }
    >
      <canvas ref={canvasRef} className="pixelation-img__canvas" aria-hidden="true" />
      <div className="pixelation-img__mask" />
    </div>
  );
}
