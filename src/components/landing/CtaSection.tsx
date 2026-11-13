import PlayButton from '@/components/landing/PlayButton';
import Reveal from '@/components/landing/Reveal';
import VoxelScene from '@/components/art/VoxelScene';
import { CTA_SCENE } from '@/data/landing';

export default function CtaSection() {
  return (
    <section className="bg-ink-950 px-6 py-24 md:py-32">
      <Reveal>
        <div className="studs relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-red to-red-dark px-8 py-14 shadow-[0_10px_0_0_#6e1209] sm:px-14 sm:py-20">
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h2 className="title-outline font-display text-4xl leading-[1.15] sm:text-5xl">
                Готов отправиться в приключение?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white">
                Откройте игру и начните свой путь уже сегодня.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <PlayButton className="btn-yellow w-full sm:w-auto">Играть сейчас</PlayButton>
              </div>
            </div>
            <VoxelScene
              scene={CTA_SCENE}
              seed={11}
              label="Иллюстрация: королевский замок"
              className="mx-auto h-auto w-full max-w-md drop-shadow-[0_18px_20px_rgb(0_0_0_/_0.3)]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
