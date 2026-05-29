import { useState } from "react";
import { FeedCard } from "./FeedCard";
import { ProjectDetailOverlay } from "./ProjectDetailOverlay";
import { translations } from "../data/i18n";
import { projects, type Language, type Project } from "../data/projects";
import type { SoundController } from "../hooks/useSound";

interface PortfolioGridProps {
  language: Language;
  sound: SoundController;
}

export function PortfolioGrid({ language, sound }: PortfolioGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [openedProject, setOpenedProject] = useState<Project | null>(null);
  const hasHover = hoveredId !== null;
  const t = translations[language];

  const openProject = (project: Project) => {
    sound.play(0.3);
    setHoveredId(project.id);
    setOpenedProject(project);
  };

  return (
    <main className="home" data-phase={openedProject ? "open" : hasHover ? "wake" : "dormant"}>
      <div className="portfolio-container">
        <div className="portfolio-grid">
          {projects.map((project, index) => {
            const active = hoveredId === project.id || openedProject?.id === project.id;
            return (
              <FeedCard
                key={project.id}
                project={project}
                index={index}
                active={active}
                dimmed={hasHover && !active}
                privateLabel={t.project.private}
                onWake={setHoveredId}
                onSleep={() => {
                  if (!openedProject) {
                    setHoveredId(null);
                  }
                }}
                onOpen={openProject}
                onSound={() => sound.play(0.3)}
              />
            );
          })}
        </div>
      </div>

      <ProjectDetailOverlay
        project={openedProject}
        language={language}
        onClose={() => {
          setOpenedProject(null);
          setHoveredId(null);
        }}
        sound={sound}
      />
    </main>
  );
}
