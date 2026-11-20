import ArcMark from "./ArcMark";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 py-8 sm:px-6">
      <div className="mx-auto h-1 max-w-6xl rounded-full bg-gradient-to-r from-framer-blue via-framer-purple via-40% to-framer-pink" />
      <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center gap-3 text-center text-xs text-gray-500 sm:flex-row sm:justify-between sm:text-left">
        <p className="flex items-baseline gap-2">
          <ArcMark className="text-sm" />
          <span className="text-gray-400">Building things that last.</span>
        </p>
        <p>© {new Date().getFullYear()} Сергей Кухаренко · Удалённо, UTC+3</p>
      </div>
    </footer>
  );
}
