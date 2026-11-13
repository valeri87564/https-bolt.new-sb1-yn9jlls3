import Reveal from '@/components/landing/Reveal';
import SectionHeading from '@/components/landing/SectionHeading';
import VoxelScene from '@/components/art/VoxelScene';
import { ABOUT_POINTS, ABOUT_SCENE, GAME } from '@/data/landing';

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-ink-900 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow="Об игре" title="Что предстоит сделать" align="left" />
          <p className="mt-6 text-lg leading-relaxed text-ink-200">{GAME.intro}</p>

          <ul className="mt-8 space-y-4">
            {ABOUT_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <li key={point.title} className="flex gap-4 rounded-2xl bg-ink-800 p-5 ring-1 ring-white/10">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow text-ink-950 shadow-[0_4px_0_0_#c98f0b]">
                    <Icon className="h-6 w-6" strokeWidth={2.25} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{point.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-200">{point.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl bg-gradient-to-br from-[#2FB7F0] to-[#0A74C2] p-6 shadow-[0_10px_0_0_#075086] sm:p-10">
            <VoxelScene
              scene={ABOUT_SCENE}
              seed={6}
              label="Иллюстрация: остров в океане"
              className="h-auto w-full drop-shadow-[0_16px_20px_rgb(0_0_0_/_0.25)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
