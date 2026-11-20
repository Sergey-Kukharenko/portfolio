import { useMemo, type ComponentType, type SVGProps } from "react";
import { contacts } from "../../data/contacts";
import { experience, periodOf } from "../../data/experience";
import { projects, type Project } from "../../data/projects";
import { useVisibleSections } from "../../data/sections";
import { BoltIcon, BriefcaseIcon, FileIcon, FolderIcon } from "../../icons";
import { openExternal, scrollToSection } from "../../lib/navigation";
import { useLocale } from "../../i18n";

export type Category = "actions" | "sections" | "projects" | "experience";

export type CommandItem = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  /** the category's name in the current language — shown as the group title, and searchable */
  categoryLabel: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
  shortcut?: string;
  run: () => void;
};

export type CommandGroup = { category: Category; label: string; items: CommandItem[] };

const CATEGORY_ORDER: Category[] = ["actions", "sections", "projects", "experience"];

/** Every palette entry, built from the site's data — nothing hand-duplicated here. */
export function useCommandItems(onOpenProject: (project: Project) => void): CommandItem[] {
  const sections = useVisibleSections();
  const { locale, t, ui } = useLocale();

  return useMemo(() => {
    const labels = ui.command.categories;
    const item = (category: Category, rest: Omit<CommandItem, "category" | "categoryLabel">): CommandItem => ({
      ...rest,
      category,
      categoryLabel: labels[category],
    });

    return [
      ...contacts
        .filter((c) => c.action)
        .map((c) =>
          item("actions", {
            id: `action-${c.id}`,
            title: t(c.action!),
            subtitle: t(c.value),
            icon: c.icon,
            gradient: c.gradient,
            shortcut: c.href.startsWith("http") ? "↗" : undefined,
            run: () => openExternal(c.href),
          })
        ),
      item("actions", {
        id: "action-top",
        title: ui.command.top,
        subtitle: ui.command.topHint,
        icon: BoltIcon,
        gradient: "from-framer-pink to-framer-red",
        run: () => scrollToSection("top"),
      }),
      ...sections.map((s) =>
        item("sections", {
          id: `section-${s.id}`,
          title: t(s.title),
          subtitle: t(s.subtitle),
          icon: FileIcon,
          gradient: s.gradient,
          run: () => scrollToSection(s.id),
        })
      ),
      ...projects.map((project) =>
        item("projects", {
          id: `project-${project.id}`,
          title: project.title,
          subtitle: `${t(project.tagline)} · ${project.stack[0]}`,
          icon: FolderIcon,
          gradient: project.gradient,
          run: () => {
            scrollToSection("projects");
            window.setTimeout(() => onOpenProject(project), 250);
          },
        })
      ),
      ...experience.map((exp) =>
        item("experience", {
          id: `exp-${exp.id}`,
          title: exp.company,
          subtitle: `${exp.role} · ${periodOf(exp, locale)}`,
          icon: BriefcaseIcon,
          gradient: exp.gradient,
          run: () => scrollToSection("experience"),
        })
      ),
    ];
  }, [onOpenProject, sections, locale, t, ui]);
}

/** Filters by title / subtitle / category and groups in display order. */
export function searchItems(items: CommandItem[], query: string) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q) ||
          r.categoryLabel.toLowerCase().includes(q)
      )
    : items;

  const groups: CommandGroup[] = CATEGORY_ORDER.map((category) => {
    const items = filtered.filter((r) => r.category === category);
    return { category, label: items[0]?.categoryLabel ?? "", items };
  }).filter((g) => g.items.length > 0);

  return { groups, flat: groups.flatMap((g) => g.items) };
}
