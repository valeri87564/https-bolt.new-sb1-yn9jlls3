import { Compass, Gem, Users, type LucideIcon } from 'lucide-react';
import { SCENES, type SceneDef } from '@/lib/voxel/scenes';

/*
 * Editable content for the presentation page.
 * Replace the placeholder texts below with the real game details.
 * PLAY_URL is a placeholder: set it to the game's Roblox link.
 */
export const GAME = {
  name: 'Название игры',
  slogan: 'Слоган, который зовёт в приключение',
  intro:
    'Короткое описание: что за мир ждёт игрока, какие места можно открыть и почему стоит заглянуть именно сюда.',
  playUrl: '#',
};

const SCENE_BY_ID: Record<string, SceneDef> = Object.fromEntries(SCENES.map((scene) => [scene.id, scene]));

export const NAV_LINKS = [
  { label: 'Об игре', href: '#about' },
  { label: 'Особенности', href: '#features' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const ABOUT_POINTS: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: 'Исследуй мир',
    text: '[Опишите, какие места и локации ждут игрока]',
    icon: Compass,
  },
  {
    title: 'Собирай предметы',
    text: '[Опишите, какие предметы можно найти и собрать]',
    icon: Gem,
  },
  {
    title: 'Играй вместе',
    text: '[Опишите, как проходит совместная игра]',
    icon: Users,
  },
];

export interface FeatureCard {
  title: string;
  text: string;
  scene: SceneDef;
  seed: number;
  label: string;
}

export const FEATURE_CARDS: FeatureCard[] = [
  {
    title: 'Исследуй мир',
    text: '[Краткая подпись: что открывает игрок в лесу]',
    scene: SCENE_BY_ID.forest,
    seed: 3,
    label: 'Иллюстрация: лесная поляна с персонажами',
  },
  {
    title: 'Собирай предметы',
    text: '[Краткая подпись: какие находки ждут в пещерах]',
    scene: SCENE_BY_ID.cave,
    seed: 5,
    label: 'Иллюстрация: пещера с кристаллами',
  },
  {
    title: 'Открывай новые зоны',
    text: '[Краткая подпись: что скрывают высокие горы]',
    scene: SCENE_BY_ID.snow,
    seed: 9,
    label: 'Иллюстрация: заснеженные вершины',
  },
  {
    title: 'Играй с друзьями',
    text: '[Краткая подпись: как проходит совместная игра]',
    scene: SCENE_BY_ID.castle,
    seed: 2,
    label: 'Иллюстрация: замок с персонажами',
  },
];

export const GALLERY_ITEMS = SCENES.map((scene, index) => ({
  scene,
  seed: index + 4,
  label: `Иллюстрация: ${scene.title.toLowerCase()}`,
}));

export const FAQ_ITEMS = [
  {
    question: 'Как начать играть?',
    answer: '[Ответ: опишите шаги, например, как открыть игру по ссылке]',
  },
  {
    question: 'Можно ли играть с друзьями?',
    answer: '[Ответ: опишите, поддерживается ли совместная игра и как в неё попасть]',
  },
  {
    question: 'На каких устройствах доступна игра?',
    answer: '[Ответ: перечислите устройства, на которых работает игра]',
  },
  {
    question: 'Нужен ли аккаунт?',
    answer: '[Ответ: уточните, нужен ли аккаунт Roblox для входа]',
  },
];

export const SOCIAL_LINKS = [
  { label: 'YouTube', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Discord', href: '#' },
] as const;

export const FAN_NOTE =
  'Это фанатская страница. Сайт не связан с Roblox Corporation и не является официальным.';

export const HERO_SCENE = SCENE_BY_ID.forest;
export const ABOUT_SCENE = SCENE_BY_ID.island;
export const CTA_SCENE = SCENE_BY_ID.castle;
