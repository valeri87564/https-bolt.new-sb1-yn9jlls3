import { ChevronDown } from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import SectionHeading from '@/components/landing/SectionHeading';
import { FAQ_ITEMS } from '@/data/landing';

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 bg-ink-900 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="FAQ" title="Частые вопросы" />

        <ul className="mt-12 space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <li key={item.question}>
              <Reveal delay={index * 60}>
                <details className="group card-chunky overflow-hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-xl transition-colors hover:text-yellow-light focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow/60 [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown className="h-6 w-6 shrink-0 text-yellow transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="px-6 pb-6 text-lg leading-relaxed text-ink-200">{item.answer}</p>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
