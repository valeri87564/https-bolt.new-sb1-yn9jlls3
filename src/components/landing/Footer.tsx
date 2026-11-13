import { FAN_NOTE, GAME, NAV_LINKS, SOCIAL_LINKS } from '@/data/landing';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-wide">{GAME.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-400">{FAN_NOTE}</p>
        </div>

        <nav aria-label="Разделы сайта">
          <p className="font-display text-lg text-ink-200">Разделы</p>
          <ul className="mt-3 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-bold text-ink-200 transition-colors hover:text-yellow">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Соцсети">
          <p className="font-display text-lg text-ink-200">Мы в соцсетях</p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex rounded-xl bg-ink-800 px-4 py-2 font-bold text-ink-50 ring-1 ring-white/10 transition-colors hover:bg-ink-700 hover:text-yellow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm font-bold text-ink-400">
        © {new Date().getFullYear()} {GAME.name}
      </div>
    </footer>
  );
}
