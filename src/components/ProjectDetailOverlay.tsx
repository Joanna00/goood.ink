import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { PixelationImg } from "./PixelationImg";
import { CanvasText } from "./CanvasText";
import { PixelIcon } from "./PixelIcon";
import { translations } from "../data/i18n";
import type { Language, Project } from "../data/projects";
import type { SoundController } from "../hooks/useSound";

interface ProjectDetailOverlayProps {
  project: Project | null;
  language: Language;
  onClose: () => void;
  sound: SoundController;
}

function readableTextColor(background: string) {
  const value = background.replace("#", "");
  if (value.length !== 6) {
    return "#ffffff";
  }

  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance > 0.6 ? "#111111" : "#ffffff";
}

function TypewriterQuote({ text }: { text: string }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 28);

    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <blockquote className="detail-quote">
      {visibleText}
      <span className="detail-quote__cursor" aria-hidden="true" />
    </blockquote>
  );
}

export function ProjectDetailOverlay({ project, language, onClose, sound }: ProjectDetailOverlayProps) {
  const t = translations[language];
  const images = useMemo(() => {
    if (!project) {
      return [];
    }

    return [project.mainImage, ...project.detailImages].filter(Boolean) as string[];
  }, [project]);

  useEffect(() => {
    if (!project) {
      return;
    }

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.section
          className="project-detail"
          style={
            {
              "--project-primary": project.primaryColor,
              "--project-secondary": project.secondaryColor,
              "--project-on-secondary": readableTextColor(project.secondaryColor),
            } as CSSProperties
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div className="project-detail__panel" layoutId={`project-card-${project.id}`}>
            <section className="project-detail__hero">
              <PixelationImg
                src={project.heroImage}
                active
                pixelSize={1}
                hoverPixelSize={1}
                maskColor={project.secondaryColor}
                maskOpacity={0.34}
                className="project-detail__hero-img"
              />
              {(project.heroHeadingImage || project.specialHeadingImage) ? (
                <img
                  className="project-detail__floating-img"
                  src={project.heroHeadingImage ?? project.specialHeadingImage}
                  alt=""
                  loading="lazy"
                />
              ) : null}
              <button
                type="button"
                className="project-detail__close"
                aria-label={t.controls.close}
                onClick={() => {
                  sound.play(0.3);
                  onClose();
                }}
              >
                <PixelIcon kind="close" />
              </button>
              <div className="project-detail__hero-copy">
                <CanvasText text={project.binaryId} width={120} height={22} fontSize={10} color={project.primaryColor} />
                <h1>{project.heading}</h1>
                <p>{project.date}</p>
                <span>{project.tags}</span>
              </div>
            </section>

            <div className="project-detail__body">
              <aside className="project-detail__meta">
                <dl>
                  <div>
                    <dt>{t.project.brand}</dt>
                    <dd>{project.brand}</dd>
                  </div>
                  <div>
                    <dt>{t.project.year}</dt>
                    <dd>{project.date}</dd>
                  </div>
                  <div>
                    <dt>{t.project.role}</dt>
                    <dd>{project.tags}</dd>
                  </div>
                </dl>
              </aside>
              <div className="project-detail__content">
                <motion.p
                  className="project-detail__description"
                  initial={{ y: 200, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {project.description}
                </motion.p>
                <TypewriterQuote text={project.quote} />

                {project.sections.map((section) => (
                  <motion.section
                    key={section.title}
                    className="project-detail__section"
                    initial={{ y: 200, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                  </motion.section>
                ))}

                <div className="project-detail__images">
                  {images.map((src, index) => (
                    <img key={src} src={src} alt={`${project.brand} detail ${index + 1}`} loading="lazy" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
