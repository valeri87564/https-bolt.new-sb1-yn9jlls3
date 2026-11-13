import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import PlayButton from '@/components/landing/PlayButton';
import { GAME, NAV_LINKS } from '@/data/landing';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'bg-ink-950/95 shadow-[0_6px_0_0_#0a0c10] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" onClick={closeMenu} className="min-w-0 truncate font-display text-xl tracking-wide sm:text-2xl">
          {GAME.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-2 text-base font-bold text-ink-200 transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-1 after:origin-left after:scale-x-0 after:rounded-full after:bg-yellow after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <PlayButton className="btn-green hidden px-5 py-2.5 text-base sm:inline-flex">Играть</PlayButton>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 text-lg font-bold text-ink-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <PlayButton className="btn-green w-full">Играть</PlayButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
