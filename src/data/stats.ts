import { experience } from "./experience";
import { projects } from "./projects";
import { monthsBetween } from "../lib/dates";

// everything derived from the dates in experience.ts, so the site never goes
// stale or contradicts itself between sections
const careerStart = experience[experience.length - 1].start;
const leadMonths = experience
  .filter((e) => e.role.includes("Lead"))
  .reduce((sum, e) => sum + monthsBetween(e.start, e.end), 0);

export const stats = {
  years: Math.floor(monthsBetween(careerStart) / 12),
  leadYears: Math.floor(leadMonths / 12),
  companies: experience.length,
  projects: projects.length,
};
