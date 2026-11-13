import { box, type Prism } from '@/lib/voxel/prisms';

export const GRID = 9;

const GRASS = '#6ACB52';
const DIRT = '#8B5E34';
const WOOD = '#7A4B25';
const LEAF = '#2F9E44';
const FLOWER = '#FFD43B';
const SAND = '#F2C46D';
const SAND_SIDE = '#D9A441';
const CACTUS = '#2F9E44';
const ROCK = '#8A94A6';
const PYRAMID = '#E8B04A';
const PYRAMID_SIDE = '#C98E2C';
const PYRAMID_TOP = '#FFE08A';
const WATER = '#3BB3F0';
const WATER_SIDE = '#2A8BCB';
const STONE = '#9AA5B1';
const STONE_SIDE = '#7D8794';
const RED = '#D7261B';
const RED_SIDE = '#9E1A12';
const YELLOW = '#FFC21A';
const CAVE_FLOOR = '#4C566A';
const CAVE_SIDE = '#3B4252';
const CRYSTALS = ['#3CB4FF', '#FFC21A', '#4ADE80', '#FF5A4E'];
const SNOW = '#F5FAFF';
const SNOW_SIDE = '#CBD5E1';
const PINE = '#1F7A4D';
const SKIN = '#FFC21A';
const PANTS = '#2C313B';
const HAIR = '#3A2A1E';

export type SceneBuilder = (seed: number) => Prism[];

export interface SceneDef {
  id: string;
  title: string;
  build: SceneBuilder;
}

export function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function makeGrid(fn: (x: number, y: number) => number): number[][] {
  return Array.from({ length: GRID }, (_, x) => Array.from({ length: GRID }, (_, y) => fn(x, y)));
}

function character(x: number, y: number, base: number, shirt: string): Prism[] {
  const cx = x + 0.5;
  const cy = y + 0.5;
  const part = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, color: string) =>
    box(cx + x0, cy + y0, cx + x1, cy + y1, base + z0, base + z1, color);

  return [
    part(-0.18, -0.02, -0.12, 0.12, 0, 1, PANTS),
    part(0.02, 0.18, -0.12, 0.12, 0, 1, PANTS),
    part(-0.2, 0.2, -0.12, 0.12, 1, 2, shirt),
    part(-0.28, -0.2, -0.1, 0.1, 1, 1.9, SKIN),
    part(0.2, 0.28, -0.1, 0.1, 1, 1.9, SKIN),
    part(-0.16, 0.16, -0.16, 0.16, 2, 2.8, SKIN),
    part(-0.17, 0.17, -0.17, 0.17, 2.8, 3, HAIR),
  ];
}

function tree(x: number, y: number, base: number): Prism[] {
  return [
    box(x + 0.42, y + 0.42, x + 0.58, y + 0.58, base, base + 1.5, WOOD),
    box(x + 0.12, y + 0.12, x + 0.88, y + 0.88, base + 1.5, base + 2.9, LEAF),
  ];
}

function forest(seed: number): Prism[] {
  const rng = mulberry32(seed);
  const heights = makeGrid((x, y) => clamp(Math.round(2 + Math.sin(x * 0.8 + seed) + Math.cos(y * 0.7)), 1, 4));
  const reserved = new Set(['4,4', '3,5', '5,3']);
  const prisms: Prism[] = [];

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      prisms.push(box(x, y, x + 1, y + 1, 0, heights[x][y], GRASS, DIRT));
    }
  }
  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      const roll = rng();
      if (reserved.has(`${x},${y}`)) continue;
      if (roll < 0.2) prisms.push(...tree(x, y, heights[x][y]));
      else if (roll < 0.28) prisms.push(box(x + 0.4, y + 0.4, x + 0.6, y + 0.6, heights[x][y], heights[x][y] + 0.5, FLOWER));
    }
  }

  prisms.push(
    ...character(4, 4, heights[4][4], '#E8382B'),
    ...character(3, 5, heights[3][5], '#0A74C2'),
    ...character(5, 3, heights[5][3], YELLOW),
  );
  return prisms;
}

function desert(seed: number): Prism[] {
  const rng = mulberry32(seed);
  const inPyramid = (x: number, y: number) => x >= 1 && x <= 6 && y >= 1 && y <= 6;
  const heights = makeGrid((x, y) =>
    inPyramid(x, y) ? 2 : 1 + (Math.sin(x * 0.6 + seed) + Math.cos(y * 0.5) > 1.2 ? 1 : 0),
  );
  const reserved = new Set(['4,7', '7,4']);
  const prisms: Prism[] = [];

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      prisms.push(box(x, y, x + 1, y + 1, 0, heights[x][y], SAND, SAND_SIDE));
    }
  }

  for (let k = 0; k < 3; k++) {
    prisms.push(
      box(1 + k, 1 + k, 7 - k, 7 - k, 2 + k, 3 + k, k === 2 ? PYRAMID_TOP : PYRAMID, k === 2 ? PYRAMID_TOP : PYRAMID_SIDE),
    );
  }

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      if (inPyramid(x, y) || reserved.has(`${x},${y}`)) continue;
      const roll = rng();
      const h = heights[x][y];
      if (roll < 0.12) {
        prisms.push(
          box(x + 0.42, y + 0.42, x + 0.58, y + 0.58, h, h + 2.2, CACTUS),
          box(x + 0.58, y + 0.48, x + 0.78, y + 0.58, h + 1.1, h + 1.6, CACTUS),
        );
      } else if (roll < 0.2) {
        prisms.push(box(x + 0.2, y + 0.2, x + 0.8, y + 0.8, h, h + 0.6, ROCK));
      }
    }
  }

  prisms.push(...character(4, 7, heights[4][7], RED), ...character(7, 4, heights[7][4], '#0A74C2'));
  return prisms;
}

function island(seed: number): Prism[] {
  const rng = mulberry32(seed);
  const distance = (x: number, y: number) =>
    Math.hypot(x - 4, y - 4) + Math.sin(x * 1.3 + seed) * 0.5 + Math.cos(y * 1.1) * 0.5;
  const prisms: Prism[] = [];

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      const d = distance(x, y);
      if (d < 2.2) prisms.push(box(x, y, x + 1, y + 1, 0, 3, GRASS, DIRT));
      else if (d < 3.4) prisms.push(box(x, y, x + 1, y + 1, 0, 2, SAND, SAND_SIDE));
      else prisms.push(box(x, y, x + 1, y + 1, 0, 1, WATER, WATER_SIDE));
    }
  }

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      if (distance(x, y) >= 2.2 || rng() > 0.25 || (x === 4 && y === 4)) continue;
      prisms.push(
        box(x + 0.44, y + 0.44, x + 0.56, y + 0.56, 3, 5.4, WOOD),
        box(x, y + 0.42, x + 1, y + 0.58, 5.4, 5.8, LEAF),
        box(x + 0.42, y, x + 0.58, y + 1, 5.6, 6, LEAF),
      );
    }
  }

  prisms.push(...character(4, 4, 3, RED), ...character(5, 5, 3, '#0A74C2'));
  return prisms;
}

function castle(seed: number): Prism[] {
  const rng = mulberry32(seed);
  const prisms: Prism[] = [];
  const towers = [
    [2, 2],
    [6, 2],
    [2, 6],
    [6, 6],
  ];

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      prisms.push(box(x, y, x + 1, y + 1, 0, 1, GRASS, DIRT));
    }
  }

  for (let x = 2; x <= 6; x++) {
    for (let y = 2; y <= 6; y++) {
      const onRing = x === 2 || x === 6 || y === 2 || y === 6;
      const isGate = x === 4 && y === 6;
      if (onRing && !isGate) prisms.push(box(x, y, x + 1, y + 1, 1, 3, STONE, STONE_SIDE));
    }
  }

  for (const [x, y] of towers) {
    prisms.push(
      box(x, y, x + 1, y + 1, 1, 6, STONE, STONE_SIDE),
      box(x - 0.1, y - 0.1, x + 1.1, y + 1.1, 6, 6.6, RED, RED_SIDE),
      box(x + 0.48, y + 0.48, x + 0.52, y + 0.52, 6.6, 8.4, STONE),
      box(x + 0.52, y + 0.48, x + 0.92, y + 0.56, 7.4, 8, YELLOW),
    );
  }

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      const outside = x < 2 || x > 6 || y < 2 || y > 6;
      if (outside && rng() < 0.1) prisms.push(...tree(x, y, 1));
    }
  }

  prisms.push(...character(4, 4, 1, RED), ...character(4, 7, 1, '#0A74C2'));
  return prisms;
}

function cave(seed: number): Prism[] {
  const rng = mulberry32(seed);
  const heights = makeGrid(() => 1 + Math.floor(rng() * 2));
  const prisms: Prism[] = [];

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      prisms.push(box(x, y, x + 1, y + 1, 0, heights[x][y], CAVE_FLOOR, CAVE_SIDE));
    }
  }

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      if (rng() > 0.3 || (x === 4 && y === 4) || (x === 5 && y === 6)) continue;
      const h = heights[x][y];
      const color = CRYSTALS[Math.floor(rng() * CRYSTALS.length)];
      const height = 1.2 + rng() * 2.4;
      prisms.push(box(x + 0.3, y + 0.3, x + 0.7, y + 0.7, h, h + height, color));
    }
  }

  prisms.push(...character(4, 4, heights[4][4], '#FF5A4E'), ...character(5, 6, heights[5][6], '#4ADE80'));
  return prisms;
}

function snow(seed: number): Prism[] {
  const rng = mulberry32(seed);
  const heights = makeGrid((x, y) => (x >= 2 && x <= 6 && y >= 2 && y <= 6 ? 1 : 1 + (rng() < 0.2 ? 1 : 0)));
  const prisms: Prism[] = [];

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      prisms.push(box(x, y, x + 1, y + 1, 0, heights[x][y], SNOW, SNOW_SIDE));
    }
  }

  prisms.push(
    box(2, 2, 7, 7, 1, 2, ROCK, STONE_SIDE),
    box(3, 3, 6, 6, 2, 3, ROCK, STONE_SIDE),
    box(4, 4, 5, 5, 3, 4, SNOW, SNOW_SIDE),
  );

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      const onPeak = x >= 2 && x < 7 && y >= 2 && y < 7;
      if (onPeak || rng() > 0.12) continue;
      const h = heights[x][y];
      prisms.push(
        box(x + 0.44, y + 0.44, x + 0.56, y + 0.56, h, h + 0.8, WOOD),
        box(x + 0.2, y + 0.2, x + 0.8, y + 0.8, h + 0.8, h + 2, PINE),
        box(x + 0.3, y + 0.3, x + 0.7, y + 0.7, h + 2, h + 2.8, PINE),
      );
    }
  }

  prisms.push(...character(8, 4, heights[8][4], RED), ...character(8, 6, heights[8][6], YELLOW));
  return prisms;
}

export const SCENES: SceneDef[] = [
  { id: 'forest', title: 'Лесная поляна', build: forest },
  { id: 'desert', title: 'Песчаные дюны', build: desert },
  { id: 'island', title: 'Остров в океане', build: island },
  { id: 'castle', title: 'Королевский замок', build: castle },
  { id: 'cave', title: 'Кристальная пещера', build: cave },
  { id: 'snow', title: 'Снежные вершины', build: snow },
];
