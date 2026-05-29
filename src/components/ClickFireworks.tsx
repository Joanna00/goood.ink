import gsap from "gsap";
import { useEffect, useRef } from "react";

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function ClickFireworks() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const spawn = (x: number, y: number) => {
      const layer = layerRef.current;
      if (!layer) {
        return;
      }

      const count = Math.round(randomBetween(20, 30));
      for (let index = 0; index < count; index += 1) {
        const particle = document.createElement("span");
        const size = randomBetween(4, 10);
        const angle = randomBetween(0, Math.PI * 2);
        const radius = randomBetween(50, 130);
        const targetX = Math.cos(angle) * radius;
        const targetY = Math.sin(angle) * radius;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundPosition = `${Math.round(randomBetween(0, 100))}% 50%`;
        layer.appendChild(particle);

        gsap
          .timeline({
            delay: randomBetween(0, 0.12),
            onComplete: () => particle.remove(),
          })
          .to(particle, { x: targetX, y: targetY, opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" }, 0)
          .to(particle, { y: targetY + 20, opacity: 0.8, scale: 0.8, duration: 0.26, ease: "none" })
          .to(particle, { y: targetY + 60, opacity: 0, scale: 0.3, duration: randomBetween(0.18, 0.34), ease: "power2.in" });
      }
    };

    const onPointer = (event: PointerEvent) => spawn(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        spawn(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("click", onPointer);
    window.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      window.removeEventListener("click", onPointer);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return <div className="click-fireworks" ref={layerRef} aria-hidden="true" />;
}
