/** List with the site's small purple dot markers. */
export function BulletList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {items.map((p) => (
        <li key={p} className="flex gap-2 text-sm text-gray-400">
          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-framer-purple" />
          {p}
        </li>
      ))}
    </ul>
  );
}
