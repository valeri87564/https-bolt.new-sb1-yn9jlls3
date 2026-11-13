import { useMemo } from 'react';
import type { SceneDef } from '@/lib/voxel/scenes';
import { renderPrisms } from '@/lib/voxel/prisms';

interface VoxelSceneProps {
  scene: SceneDef;
  seed?: number;
  label: string;
  className?: string;
}

export default function VoxelScene({ scene, seed = 1, label, className }: VoxelSceneProps) {
  const rendered = useMemo(() => renderPrisms(scene.build(seed)), [scene, seed]);

  return (
    <svg
      viewBox={rendered.viewBox}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      {rendered.faces.map((face, index) => (
        <polygon
          key={index}
          points={face.points}
          fill={face.fill}
          stroke="rgb(0,0,0)"
          strokeOpacity={0.14}
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
