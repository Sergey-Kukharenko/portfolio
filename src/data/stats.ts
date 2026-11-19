import { experience } from "./experience";
import { projects } from "./projects";

// first job (see the last entry in experience.ts) — years are derived from it,
// so the site never goes stale or contradicts itself between sections
const CAREER_START = new Date(2014, 8); // September 2014

const msPerYear = 365.25 * 24 * 60 * 60 * 1000;

export const stats = {
  years: Math.floor((Date.now() - CAREER_START.getTime()) / msPerYear),
  companies: experience.length,
  projects: projects.length,
};
