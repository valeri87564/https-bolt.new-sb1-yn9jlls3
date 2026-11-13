interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}

export default function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';
  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="font-display text-lg uppercase tracking-widest text-yellow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-[1.15] sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-ink-200">{description}</p>}
    </div>
  );
}
