import { forwardRef, useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  m,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { projectCategories, projects, type Project } from "../data/projects";
import { ExternalLinkIcon, FolderIcon, XIcon } from "../icons";
import SectionHeading from "./SectionHeading";
import { BulletList } from "./ui/BulletList";
import { SegmentedControl } from "./ui/SegmentedControl";
import { TagList } from "./ui/Tag";
import { useLockBodyScroll } from "../lib/useLockBodyScroll";

type Props = {
  selected: Project | null;
  onSelect: (project: Project) => void;
  onClose: () => void;
};

const categoryOptions = projectCategories.map((c) => ({ value: c, label: c }));

const MODAL_LAYOUT = { type: "tween", duration: 0.34, ease: [0.4, 0, 0.2, 1] } as const;

export default function Projects({ selected, onSelect, onClose }: Props) {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("Все");

  const filtered = useMemo(
    () => (category === "Все" ? projects : projects.filter((p) => p.category === category)),
    [category]
  );

  return (
    <MotionConfig transition={{ layout: MODAL_LAYOUT }}>
    <section id="projects" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Проекты"
        title="Pet-проекты и практика"
        description="Приложения, приближенные к реальным продуктовым сценариям: e-commerce, marketplace, community, CRM. Нажмите на карточку, чтобы узнать подробнее."
      />

      <div className="mb-8 flex justify-center">
        <SegmentedControl
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          layoutId="filter-pill"
        />
      </div>

      <m.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => onSelect(project)}
            />
          ))}
        </AnimatePresence>
      </m.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={onClose} />}
      </AnimatePresence>
    </section>
    </MotionConfig>
  );
}

const ProjectCard = forwardRef<HTMLButtonElement, {
  project: Project;
  index: number;
  onOpen: () => void;
}>(function ProjectCard({ project, index, onOpen }, ref) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 12);
    rotateX.set(py * -12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.button
      ref={ref}
      type="button"
      layout
      layoutId={`card-${project.id}`}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        default: { duration: 0.35, delay: index * 0.04 },
        layout: MODAL_LAYOUT,
      }}
      whileHover={{ y: -6 }}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-colors hover:border-white/20"
    >
      <m.div
        layoutId={`card-glow-${project.id}`}
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${project.gradient} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}
      />

      <m.div
        layoutId={`card-icon-${project.id}`}
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient} text-white shadow-sm`}
      >
        <FolderIcon width={18} height={18} />
      </m.div>

      <m.h3 layoutId={`card-title-${project.id}`} className="text-base font-semibold text-white">
        {project.title}
      </m.h3>
      <p className="mt-1 text-sm text-gray-400">{project.tagline}</p>

      <div className="mt-4">
        <TagList items={project.stack.slice(0, 3)} muted />
      </div>

      <span className="mt-4 flex items-center gap-1 text-xs font-medium text-framer-teal opacity-0 transition-opacity group-hover:opacity-100">
        Подробнее <ExternalLinkIcon width={11} height={11} />
      </span>
    </m.button>
  );
});

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useLockBodyScroll(true);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-10 sm:items-center">
      <m.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      />

      <m.div
        layoutId={`card-${project.id}`}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        transition={MODAL_LAYOUT}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#131318] shadow-glow"
      >
        <m.div
          layoutId={`card-glow-${project.id}`}
          className={`absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${project.gradient} opacity-25 blur-3xl`}
        />

        {/* icon + title share a layoutId with the card, so they must stay fully opaque
            and keep animating position/size for the whole shrink-back-into-the-grid
            transition — they live outside the fade wrapper below on purpose */}
        <div className="relative px-6 pt-6 sm:px-8 sm:pt-8">
          <m.div
            layoutId={`card-icon-${project.id}`}
            className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-glow`}
          >
            <FolderIcon width={22} height={22} />
          </m.div>

          <m.h3 layoutId={`card-title-${project.id}`} className="text-2xl font-bold text-white">
            {project.title}
          </m.h3>
        </div>

        {/* content that only exists in the modal (not the card) fades out fast on close,
            instead of riding along with the slower shared-layout shrink, so it doesn't
            visibly cross-fade with the grid card underneath */}
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: "easeIn" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-gray-300 hover:bg-white/20"
            aria-label="Закрыть"
          >
            <XIcon width={14} height={14} />
          </button>

          <div className="relative max-h-[80vh] overflow-y-auto results-scroll p-6 pt-0 sm:p-8 sm:pt-0">
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.14, duration: 0.28 }}
              className="mt-1 text-sm font-medium text-framer-teal"
            >
              {project.tagline}
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.19, duration: 0.28 }}
              className="mt-5 text-sm leading-relaxed text-gray-300"
            >
              {project.description}
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.28 }}
              className="mt-5"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Что реализовано
              </p>
              <BulletList items={project.features} />
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.29, duration: 0.28 }}
              className="mt-5"
            >
              <TagList items={project.stack} />
            </m.div>

            <m.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.28 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-4 py-3 text-sm font-semibold text-white ${project.gradient}`}
            >
              Открыть демо <ExternalLinkIcon width={14} height={14} />
            </m.a>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
