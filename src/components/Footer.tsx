import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { PixelIcon, type PixelIconKind } from "./PixelIcon";
import { translations } from "../data/i18n";
import type { Language } from "../data/projects";
import type { SoundController } from "../hooks/useSound";

interface FooterProps {
  language: Language;
  sound: SoundController;
}

interface IndicatorProps {
  label: string;
  icon: PixelIconKind;
  progress: number;
  visible?: boolean;
  active?: boolean;
  onClick?: () => void;
  onHover: () => void;
}

function Indicator({ label, icon, progress, visible = true, active = false, onClick, onHover }: IndicatorProps) {
  return (
    <button
      type="button"
      className={`footer-indicator${active ? " is-active" : ""}`}
      data-visible={visible}
      aria-label={label}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      <span className="footer-indicator__fill" style={{ height: `${Math.round(progress * 100)}%` }} />
      <PixelIcon kind={icon} />
    </button>
  );
}

export function Footer({ language, sound }: FooterProps) {
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(88);
  const [popup, setPopup] = useState<string | null>(null);
  const t = translations[language];

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 0 : window.scrollY / max);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const thanks = useMemo(() => t.footer.thanks, [t.footer.thanks]);

  const like = () => {
    sound.play(0.5);
    setLiked(true);
    setLikeCount((count) => count + 1);
    setPopup(thanks[Math.floor(Math.random() * thanks.length)]);
    window.setTimeout(() => setPopup(null), 2100);
  };

  return (
    <footer className="site-footer">
      <p>{t.footer.copyright}</p>
      <div className="site-footer__right">
        <a
          className="footer-indicator"
          data-visible="true"
          href="mailto:hello@harryds.com"
          aria-label={t.controls.email}
          onMouseEnter={() => sound.play(0.5)}
        >
          <span className="footer-indicator__fill" style={{ height: `${Math.round(progress * 100)}%` }} />
          <PixelIcon kind="email" />
        </a>
        <div className="footer-like-wrap">
          <Indicator
            label={t.controls.heart}
            icon="heart"
            progress={progress}
            active={liked}
            onClick={like}
            onHover={() => sound.play(0.5)}
          />
          {liked ? <span className="footer-like-count">{likeCount}</span> : null}
          <AnimatePresence>
            {popup ? (
              <motion.div
                className="like-popup"
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "120%", opacity: 0 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.45 }}
              >
                <div>{popup}</div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <Indicator
          label={t.controls.top}
          icon="top"
          progress={progress}
          visible={progress > 0.08}
          onClick={() => {
            sound.play(0.5);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onHover={() => sound.play(0.5)}
        />
      </div>
    </footer>
  );
}
