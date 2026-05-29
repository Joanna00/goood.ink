import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const startedAt = performance.now();
    const interval = window.setInterval(() => {
      const next = Math.min(100, Math.round(((performance.now() - startedAt) / 1000) * 100));
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(interval);
      }
    }, 40);

    const timeline = gsap.timeline({ onComplete: () => setHidden(true) });
    timeline
      .fromTo(contentRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
      .to(contentRef.current, { y: 100, opacity: 0, duration: 0.5, ease: "power3.in" }, "+=0.35")
      .to(maskRef.current, { scaleY: 0, transformOrigin: "bottom", duration: 0.4, ease: "power2.inOut" }, "+=0.1");

    return () => {
      window.clearInterval(interval);
      timeline.kill();
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div className="page-loader" ref={maskRef}>
      <div className="page-loader__content" ref={contentRef}>
        <span>LOADING...</span>
        <strong>HARRY DESIGN STUDIO</strong>
        <b>{progress.toString(2).padStart(8, "0")}</b>
      </div>
    </div>
  );
}
