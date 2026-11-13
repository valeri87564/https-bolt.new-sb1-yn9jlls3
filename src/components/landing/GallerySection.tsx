import Reveal from '@/components/landing/Reveal';
import SectionHeading from '@/components/landing/SectionHeading';
import VoxelScene from '@/components/art/VoxelScene';
import { GALLERY_ITEMS } from '@/data/landing';

export default function GallerySection() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-ink-900 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Галерея"
          title="Локации и герои"
          description="Иллюстрации в блочном стиле: от лесных полян до заснеженных вершин."
        />

        <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <li key={item.scene.id}>
              <Reveal delay={index * 80}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-[#2FB7F0] to-[#0A74C2] shadow-[0_8px_0_0_#0a0c10] ring-1 ring-white/10">
                  <VoxelScene
                    scene={item.scene}
                    seed={item.seed}
                    label={item.label}
                    className="h-full w-full p-5 transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent px-5 pb-4 pt-12 font-display text-xl text-white">
                    {item.scene.title}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
