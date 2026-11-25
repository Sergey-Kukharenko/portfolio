import { forwardRef, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  animate,
  AnimatePresence,
  m,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import { projectCategories, projects, type Project, type ProjectFilter } from "../data/projects";
import { ExternalLinkIcon, FolderIcon, XIcon } from "../icons";
import SectionHeading from "./SectionHeading";
import { BulletList } from "./ui/BulletList";
import { SegmentedControl } from "./ui/SegmentedControl";
import { TagList } from "./ui/Tag";
import { useOverlay } from "../lib/useOverlay";
import { useLocale } from "../i18n";

type Props = {
  selected: Project | null;
  onSelect: (project: Project) => void;
  onClose: () => void;
};

const INITIAL_COUNT = 6; // the rest are one click away

const MODAL_LAYOUT = { type: "tween", duration: 0.34, ease: [0.4, 0, 0.2, 1] } as const;

/** Show all / show less: the grid's real height glides, so everything below follows. */
const RESIZE = { type: "tween", duration: 0.45, ease: [0.4, 0, 0.2, 1] } as const;

export default function Projects({ selected, onSelect, onClose }: Props) {
  const { ui } = useLocale();
  const [category, setCategory] = useState<ProjectFilter>("all");
  const categoryOptions = projectCategories.map((c) => ({ value: c, label: c === "all" ? ui.projects.all : c }));
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const resizing = useRef(false);
  const clipUntilExit = useRef(false);

  const filtered = useMemo(
    () => (category === "all" ? projects : projects.filter((p) => p.category === category)),
    [category]
  );

  // Animates the wrapper's height between the current and the target grid, clipping
  // the overflow meanwhile. Collapsing keeps the toggle button under the pointer
  // (the page scrolls along with the shrinking grid) and only drops the extra cards
  // once they are clipped away — removing them first made everything below jump up
  // while they faded out on top of the contacts.
  const toggleShowAll = () => {
    const wrap = wrapRef.current;
    const grid = wrap?.firstElementChild as HTMLElement | null;
    if (!wrap || !grid || resizing.current) return;
    resizing.current = true;

    const from = wrap.offsetHeight;
    wrap.style.height = `${from}px`;
    wrap.style.overflow = "hidden";
    // Chrome's scroll anchoring would compensate as well, doubling the scroll
    const root = document.documentElement;
    root.style.overflowAnchor = "none";

    let to: number;
    if (showAll) {
      const kept = Array.from(grid.children).slice(0, INITIAL_COUNT) as HTMLElement[];
      to = Math.max(...kept.map((card) => card.offsetTop + card.offsetHeight));
    } else {
      flushSync(() => setShowAll(true));
      to = grid.offsetHeight;
    }

    const collapsing = showAll;
    // absolute, not scrollBy deltas: WebKit rounds each scroll step, and they add up
    const scrollStart = window.scrollY;
    animate(from, to, {
      ...(reduceMotion ? { duration: 0 } : RESIZE),
      onUpdate: (h) => {
        wrap.style.height = `${h}px`;
        if (collapsing) window.scrollTo({ top: scrollStart + h - from, behavior: "instant" });
      },
      onComplete: () => {
        if (collapsing) {
          clipUntilExit.current = true; // released by onExitComplete
          // drop the cards before freeing the height, or it flashes full for a frame
          flushSync(() => setShowAll(false));
        } else {
          wrap.style.overflow = "";
        }
        wrap.style.height = "";
        root.style.overflowAnchor = "";
        resizing.current = false;
      },
    });
  };

  const releaseClip = () => {
    if (!clipUntilExit.current || !wrapRef.current) return;
    clipUntilExit.current = false;
    wrapRef.current.style.overflow = "";
  };

  return (
    <MotionConfig transition={{ layout: MODAL_LAYOUT }}>
    <section id="projects" className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        title={ui.projects.title}
        description={ui.projects.description}
      />

      <div className="mb-8 flex justify-center">
        <SegmentedControl
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          layoutId="filter-pill"
        />
      </div>

      <div ref={wrapRef} className="relative">
      <m.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" onExitComplete={releaseClip}>
          {(showAll ? filtered : filtered.slice(0, INITIAL_COUNT)).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => onSelect(project)}
            />
          ))}
        </AnimatePresence>
      </m.div>
      </div>

      {filtered.length > INITIAL_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={toggleShowAll}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            {showAll ? ui.projects.showLess : ui.projects.showAll(filtered.length)}
          </button>
        </div>
      )}

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
  const { t } = useLocale();
  return (
    <m.button
      ref={ref}
      type="button"
      layout
      layoutId={`card-${project.id}`}
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        default: { duration: 0.35, delay: index * 0.04 },
        layout: MODAL_LAYOUT,
      }}
      whileHover={{ y: -6 }}
      className="group relative isolate flex flex-col overflow-hidden rounded-2xl bg-white/[0.03] p-5 text-left"
    >
      <m.div
        layoutId={`card-glow-${project.id}`}
        className={`glow-soft absolute -right-[104px] -top-[104px] h-64 w-64 bg-gradient-to-br ${project.gradient} opacity-20 transition-opacity group-hover:opacity-40`}
      />

      <ProjectPreview project={project} className="mb-4" />

      <m.h3 layoutId={`card-title-${project.id}`} className="text-base font-semibold text-white">
        {project.title}
      </m.h3>
      <p className="mt-1 text-sm text-gray-400">{t(project.tagline)}</p>

      {/* pushed to the bottom so tags and years line up across a row */}
      <div className="mt-auto flex items-start justify-between gap-3 pt-4">
        <TagList items={project.stack.slice(0, 3)} muted />
        <span className="pt-0.5 text-xs tabular-nums text-gray-500">{project.year}</span>
      </div>

      {/* the border sits on top: drawn on the card itself it vanished under the
          corner glow (and Safari let the blur bleed over the rounded corner) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition-colors group-hover:border-white/20"
      />
    </m.button>
  );
});

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t, ui } = useLocale();
  useOverlay(true, onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-10 sm:items-center">
      {/* fixed, not absolute: a long modal scrolls the overlay, and an absolute
          backdrop scrolled away with it, uncovering the page below the dialog */}
      <m.div
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
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
          className={`glow-soft absolute -right-48 -top-48 h-[480px] w-[480px] bg-gradient-to-br ${project.gradient} opacity-25`}
        />

        {/* preview + title share a layoutId with the card, so they must stay fully opaque
            and keep animating position/size for the whole shrink-back-into-the-grid
            transition — they live outside the fade wrapper below on purpose */}
        <div className="relative px-6 pt-6 sm:px-8 sm:pt-8">
          <ProjectPreview project={project} active className="mb-5" />

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
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white hover:bg-black/80"
            aria-label={ui.projects.close}
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
              {t(project.tagline)} <span className="text-gray-500">· {project.year}</span>
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.19, duration: 0.28 }}
              className="mt-5 text-sm leading-relaxed text-gray-300"
            >
              {t(project.description)}
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.28 }}
              className="mt-5"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {ui.projects.features}
              </p>
              <BulletList items={t(project.features)} />
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
              {project.linkType === "code" ? ui.projects.code : ui.projects.demo}{" "}
              <ExternalLinkIcon width={14} height={14} />
            </m.a>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}

/**
 * The app's screenshot framed in the brand: it sits as a window on the
 * project's gradient, its bottom edge running off the tile, so the grid reads
 * as one palette while each project stays recognizable. In the grid it rests
 * slightly dimmed and comes up on hover; in the modal (`active`) it is shown
 * at full strength. Same composition in both, in percentages, so the
 * shared-layout morph between them only scales. Only opacity and transform
 * animate — no filters, which cost WebKit dearly.
 */
function ProjectPreview({
  project,
  active = false,
  className = "",
}: {
  project: Project;
  active?: boolean;
  className?: string;
}) {
  return (
    <m.div
      layoutId={`card-preview-${project.id}`}
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#16161c] ${className}`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-opacity duration-500 ${
          active ? "opacity-40" : "opacity-25 group-hover:opacity-40"
        }`}
      />
      {project.preview ? (
        <img
          src={project.preview}
          alt=""
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className={`absolute left-[5%] top-[15%] w-[90%] rounded-t-lg object-cover object-top shadow-2xl ring-1 ring-white/15 transition duration-500 ease-out ${
            active
              ? "opacity-100"
              : // touch screens never hover, so there it starts out revealed
                "translate-y-1.5 opacity-75 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
          }`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-glow`}
          >
            <FolderIcon width={20} height={20} />
          </span>
        </div>
      )}
    </m.div>
  );
}
