import Reveal from '@/components/landing/Reveal';
import SectionHeading from '@/components/landing/SectionHeading';
import VoxelScene from '@/components/art/VoxelScene';
import { FEATURE_CARDS } from '@/data/landing';

export default function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-ink-950 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Особенности" title="Загляни в каждый уголок мира" />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((card, index) => (
            <li key={card.title}>
              <Reveal delay={index * 100} className="h-full">
                <article className="card-chunky group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25">
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-b from-[#1B6FB0] to-[#0B3D66] p-4">
                    <VoxelScene
                      scene={card.scene}
                      seed={card.seed}
                      label={card.label}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl">{card.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-200">{card.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
