import { plural } from "./plural";

/** A calendar month: [year, month 1–12]. */
export type YearMonth = readonly [number, number];

const toIndex = ([y, m]: YearMonth) => y * 12 + (m - 1);

export function currentMonth(now = new Date()): YearMonth {
  return [now.getFullYear(), now.getMonth() + 1];
}

/** Whole months from `start` to `end`, both included — the way hh.ru and LinkedIn count. */
export function monthsBetween(start: YearMonth, end: YearMonth = currentMonth()) {
  return toIndex(end) - toIndex(start) + 1;
}

/** "Октябрь 2025" / "October 2025". */
export function formatMonth([y, m]: YearMonth, locale: string) {
  const parts = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).formatToParts(new Date(y, m - 1));
  const month = parts.find((p) => p.type === "month")!.value; // drops ru's trailing "г."
  return `${month[0].toUpperCase()}${month.slice(1)} ${y}`;
}

/** "1 год 2 месяца" / "1 yr 2 mos". */
export function formatDuration(months: number, locale: string) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const ru = locale.startsWith("ru");
  const part = (n: number, ruForms: [string, string, string], en: string) =>
    n ? `${n} ${ru ? plural(n, ruForms) : en + (n === 1 ? "" : "s")}` : "";
  return [part(y, ["год", "года", "лет"], "yr"), part(m, ["месяц", "месяца", "месяцев"], "mo")].filter(Boolean).join(" ");
}
