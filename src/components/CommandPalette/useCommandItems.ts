import { useMemo, type ComponentType, type SVGProps } from "react";
import { contacts } from "../../data/contacts";
import { experience } from "../../data/experience";
import { projects, type Project } from "../../data/projects";
import { useVisibleSections } from "../../data/sections";
import { BoltIcon, BriefcaseIcon, FileIcon, FolderIcon } from "../../icons";
import { openExternal, scrollToSection } from "../../lib/navigation";

export type Category = "Действия" | "Разделы" | "Проекты" | "Опыт";

export type CommandItem = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
  shortcut?: string;
  run: () => void;
};

export type CommandGroup = { category: Category; items: CommandItem[] };

const CATEGORY_ORDER: Category[] = ["Действия", "Разделы", "Проекты", "Опыт"];

/** Every palette entry, built from the site's data — nothing hand-duplicated here. */
export function useCommandItems(onOpenProject: (project: Project) => void): CommandItem[] {
  const sections = useVisibleSections();

  return useMemo(
    () => [
      ...contacts
        .filter((c) => c.action)
        .map<CommandItem>((c) => ({
          id: `action-${c.id}`,
          title: c.action!,
          subtitle: c.value,
          category: "Действия",
          icon: c.icon,
          gradient: c.gradient,
          shortcut: c.href.startsWith("http") ? "↗" : undefined,
          run: () => openExternal(c.href),
        })),
      {
        id: "action-top",
        title: "Наверх страницы",
        subtitle: "Вернуться к началу",
        category: "Действия",
        icon: BoltIcon,
        gradient: "from-framer-pink to-framer-red",
        run: () => scrollToSection("top"),
      },
      ...sections.map<CommandItem>((s) => ({
        id: `section-${s.id}`,
        title: s.title,
        subtitle: s.subtitle,
        category: "Разделы",
        icon: FileIcon,
        gradient: s.gradient,
        run: () => scrollToSection(s.id),
      })),
      ...projects.map<CommandItem>((project) => ({
        id: `project-${project.id}`,
        title: project.title,
        subtitle: `${project.tagline} · ${project.stack[0]}`,
        category: "Проекты",
        icon: FolderIcon,
        gradient: project.gradient,
        run: () => {
          scrollToSection("projects");
          window.setTimeout(() => onOpenProject(project), 250);
        },
      })),
      ...experience.map<CommandItem>((exp) => ({
        id: `exp-${exp.id}`,
        title: exp.company,
        subtitle: `${exp.role} · ${exp.period}`,
        category: "Опыт",
        icon: BriefcaseIcon,
        gradient: exp.gradient,
        run: () => scrollToSection("experience"),
      })),
    ],
    [onOpenProject, sections]
  );
}

/** Filters by title / subtitle / category and groups in display order. */
export function searchItems(items: CommandItem[], query: string) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      )
    : items;

  const groups: CommandGroup[] = CATEGORY_ORDER.map((category) => ({
    category,
    items: filtered.filter((r) => r.category === category),
  })).filter((g) => g.items.length > 0);

  return { groups, flat: groups.flatMap((g) => g.items) };
}
