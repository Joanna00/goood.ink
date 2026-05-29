import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CanvasText, PixelLogo } from "./CanvasText";
import { PixelIcon } from "./PixelIcon";
import { languageLabels, translations } from "../data/i18n";
import type { Language } from "../data/projects";
import type { SoundController } from "../hooks/useSound";
import type { ThemeMode } from "../hooks/useTheme";

interface HeaderProps {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
  sound: SoundController;
}

const navWidths = {
  work: 70,
  articles: 142,
  about: 88,
};

const languages: Language[] = ["zh-Hant", "en", "ja"];

export function Header({ isDark, toggleTheme, language, setLanguage, sound }: HeaderProps) {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[language];

  const play = () => sound.play(0.3);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button className="logo-button" aria-label="Harry Design Studio" onMouseEnter={play}>
          <PixelLogo inverted={isDark} />
        </button>

        <nav className="desktop-nav" aria-label="Primary">
          {(["work", "articles", "about"] as const).map((item) => (
            <button
              type="button"
              key={item}
              className={item === "work" ? "nav-item is-active" : "nav-item"}
              onMouseEnter={play}
            >
              <CanvasText text={t.nav[item]} width={navWidths[item]} height={24} fontSize={14} />
              {item === "work" ? (
                <span className="nav-marquee" aria-hidden="true">
                  {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, index) => (
                    <span key={index} style={{ opacity }} />
                  ))}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="header-controls">
          <button
            type="button"
            className="pixel-control"
            aria-label={t.controls.theme}
            onClick={toggleTheme}
            onMouseEnter={play}
          >
            <PixelIcon kind={isDark ? "moon" : "sun"} />
          </button>
          <button
            type="button"
            className="pixel-control"
            aria-label={t.controls.sound}
            onClick={sound.toggleSound}
            onMouseEnter={play}
          >
            <PixelIcon kind={sound.enabled ? "speaker" : "muted"} />
          </button>
          <div className="language-control">
            <button
              type="button"
              className="pixel-control pixel-control--language"
              aria-label={t.controls.language}
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((current) => !current)}
              onMouseEnter={play}
            >
              <CanvasText text={languageLabels[language]} width={26} height={20} fontSize={10} align="center" />
            </button>
            <AnimatePresence>
              {languageOpen ? (
                <motion.div
                  className="language-menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.14 }}
                >
                  {languages.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => {
                        setLanguage(item);
                        setLanguageOpen(false);
                      }}
                      onMouseEnter={play}
                    >
                      {languageLabels[item]}
                    </button>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="mobile-menu-trigger"
            aria-label={t.controls.menu}
            onClick={() => setMenuOpen(true)}
            onMouseEnter={play}
          >
            {t.mobile.menu}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: "linear" }}
          >
            <div className="mobile-menu__top">
              <PixelLogo inverted />
              <button
                type="button"
                className="mobile-menu__close"
                aria-label={t.controls.close}
                onClick={() => setMenuOpen(false)}
              >
                {t.mobile.close}
              </button>
            </div>
            <div className="mobile-menu__links">
              {(["work", "articles", "about"] as const).map((item) => (
                <button type="button" key={item} onMouseEnter={play} onClick={() => setMenuOpen(false)}>
                  {t.nav[item]}
                </button>
              ))}
            </div>
            <div className="mobile-menu__controls">
              <button type="button" onClick={toggleTheme} aria-label={t.controls.theme}>
                {isDark ? "DARK" : "LIGHT"}
              </button>
              <button type="button" onClick={sound.toggleSound} aria-label={t.controls.sound}>
                {sound.enabled ? "SOUND ON" : "SOUND OFF"}
              </button>
              {languages.map((item) => (
                <button type="button" key={item} onClick={() => setLanguage(item)}>
                  {languageLabels[item]}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
