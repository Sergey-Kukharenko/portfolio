export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 py-8 sm:px-6">
      <div className="h-1 w-full rounded-full bg-gradient-to-r from-framer-blue via-framer-purple via-40% to-framer-pink" />
      <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-gray-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Сергей Кухаренко. Собрано на React, Tailwind и Framer Motion.</p>
        <p>Москва · удалённая работа</p>
      </div>
    </footer>
  );
}
