export interface Prism {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  z0: number;
  z1: number;
  color: string;
  side?: string;
}

export interface RenderedFace {
  points: string;
  fill: string;
}

export interface RenderedScene {
  viewBox: string;
  faces: RenderedFace[];
}

const TILE_W = 20;
const TILE_H = 10;
const LAYER_H = 12;
const PADDING = 12;

export function box(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  z0: number,
  z1: number,
  color: string,
  side?: string,
): Prism {
  return { x0, y0, x1, y1, z0, z1, color, side };
}

export function shade(hex: string, factor: number): string {
  const value = parseInt(hex.slice(1), 16);
  const channel = (shift: number) => Math.round(((value >> shift) & 255) * factor);
  return `rgb(${channel(16)},${channel(8)},${channel(0)})`;
}

function project(x: number, y: number, z: number): [number, number] {
  return [(x - y) * TILE_W, (x + y) * TILE_H - z * LAYER_H];
}

export function renderPrisms(prisms: Prism[]): RenderedScene {
  const sorted = [...prisms].sort((a, b) => {
    const depthA = (a.x0 + a.x1 + a.y0 + a.y1) / 2;
    const depthB = (b.x0 + b.x1 + b.y0 + b.y1) / 2;
    return depthA - depthB || a.z0 - b.z0;
  });

  const faces: RenderedFace[] = [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const emit = (corners: [number, number, number][], fill: string) => {
    const points = corners.map(([x, y, z]) => {
      const [sx, sy] = project(x, y, z);
      minX = Math.min(minX, sx);
      maxX = Math.max(maxX, sx);
      minY = Math.min(minY, sy);
      maxY = Math.max(maxY, sy);
      return `${sx.toFixed(1)},${sy.toFixed(1)}`;
    });
    faces.push({ points: points.join(' '), fill });
  };

  for (const p of sorted) {
    const leftFill = p.side ?? shade(p.color, 0.82);
    const rightFill = p.side ? shade(p.side, 0.86) : shade(p.color, 0.66);

    emit(
      [
        [p.x0, p.y1, p.z1],
        [p.x1, p.y1, p.z1],
        [p.x1, p.y1, p.z0],
        [p.x0, p.y1, p.z0],
      ],
      leftFill,
    );
    emit(
      [
        [p.x1, p.y0, p.z1],
        [p.x1, p.y1, p.z1],
        [p.x1, p.y1, p.z0],
        [p.x1, p.y0, p.z0],
      ],
      rightFill,
    );
    emit(
      [
        [p.x0, p.y0, p.z1],
        [p.x1, p.y0, p.z1],
        [p.x1, p.y1, p.z1],
        [p.x0, p.y1, p.z1],
      ],
      p.color,
    );
  }

  const viewBox = `${minX - PADDING} ${minY - PADDING} ${maxX - minX + PADDING * 2} ${maxY - minY + PADDING * 2}`;
  return { viewBox, faces };
}
