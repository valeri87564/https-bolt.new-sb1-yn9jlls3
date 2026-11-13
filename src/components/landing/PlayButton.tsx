import type { ReactNode } from 'react';
import { GAME } from '@/data/landing';

interface PlayButtonProps {
  children: ReactNode;
  className?: string;
}

export default function PlayButton({ children, className = '' }: PlayButtonProps) {
  const isExternal = /^https?:\/\//.test(GAME.playUrl);
  return (
    <a
      href={GAME.playUrl}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`btn-chunky ${className}`}
    >
      {children}
    </a>
  );
}
