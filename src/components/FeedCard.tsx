import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { PixelationImg } from "./PixelationImg";
import { CanvasText } from "./CanvasText";
import { PixelIcon } from "./PixelIcon";
import type { Project } from "../data/projects";

interface FeedCardProps {
  project: Project;
  index: number;
  active: boolean;
  dimmed: boolean;
  privateLabel: string;
  onWake: (id: number) => void;
  onSleep: () => void;
  onOpen: (project: Project) => void;
  onSound: () => void;
}

export function FeedCard({
  project,
  index,
  active,
  dimmed,
  privateLabel,
  onWake,
  onSleep,
  onOpen,
  onSound,
}: FeedCardProps) {
  const titleSize = project.size === "hero" ? "feed-card__title--hero" : project.size === "medium" ? "feed-card__title--medium" : "feed-card__title--xs";

  return (
    <motion.button
      type="button"
      layoutId={`project-card-${project.id}`}
      className={`feed-card feed-card--${project.size}`}
      data-active={active}
      data-dimmed={dimmed}
      style={
        {
          "--project-primary": project.primaryColor,
          "--dim-delay": `${index * 28}ms`,
        } as CSSProperties
      }
      aria-label={`${project.brand}: ${project.heading.replace(/\n/g, " ")}`}
      onPointerEnter={() => {
        onWake(project.id);
        onSound();
      }}
      onPointerLeave={onSleep}
      onFocus={() => onWake(project.id)}
      onBlur={onSleep}
      onClick={() => onOpen(project)}
    >
      <div className="feed-card__bg" aria-hidden="true">
        <PixelationImg
          src={project.heroImage}
          active={active}
          maskColor={project.secondaryColor}
          maskOpacity={0.6}
          className="feed-card__pixel-img"
        />
      </div>
      <div className="feed-card__grain" aria-hidden="true" />

      {project.visibility === "private" ? (
        <div className="feed-card__private">
          <PixelIcon kind="lock" size={18} />
          <span>{privateLabel}</span>
        </div>
      ) : null}

      <div className="feed-card__content">
        <CanvasText text={project.binaryId} width={116} height={20} fontSize={10} />
        <h2 className={`feed-card__title ${titleSize}`}>{project.heading}</h2>
        <div className="feed-card__date">
          <CanvasText text={project.date} width={project.size === "xs" ? 140 : 180} height={22} fontSize={9} />
        </div>
        <div className="feed-card__tags">{project.tags}</div>
      </div>
    </motion.button>
  );
}
