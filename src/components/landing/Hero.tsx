import PlayButton from '@/components/landing/PlayButton';
import VoxelScene from '@/components/art/VoxelScene';
import { GAME, HERO_SCENE } from '@/data/landing';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#0B5FA5] via-blue to-ink-950 pb-24 pt-32 md:pb-32 md:pt-40"
    >
      <div className="studs pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8">
        <div className="text-center lg:text-left">
          <p className="animate-fade-up font-display text-lg uppercase tracking-widest text-yellow-light">
            Приключение начинается
          </p>
          <h1
            className="title-outline mt-4 animate-fade-up font-display text-5xl leading-[1.1] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.1s' }}
          >
            {GAME.name}
          </h1>
          <p
            className="mt-5 animate-fade-up font-display text-2xl leading-snug text-yellow-light sm:text-3xl"
            style={{ animationDelay: '0.2s' }}
          >
            {GAME.slogan}
          </p>
          <p
            className="mx-auto mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-ink-50 lg:mx-0"
            style={{ animationDelay: '0.3s' }}
          >
            {GAME.intro}
          </p>
          <div
            className="mt-10 flex animate-fade-up justify-center lg:justify-start"
            style={{ animationDelay: '0.4s' }}
          >
            <PlayButton className="btn-yellow w-full sm:w-auto">Играть в Roblox</PlayButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] animate-float">
          <VoxelScene
            scene={HERO_SCENE}
            seed={3}
            label="Иллюстрация: игровой мир с персонажами"
            className="h-auto w-full drop-shadow-[0_24px_30px_rgb(0_0_0_/_0.35)]"
          />
        </div>
      </div>
    </section>
  );
}
