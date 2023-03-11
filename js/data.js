import {getRandomInteger ,getRandomArrayElement, createRandomIdFromRangeGenerator} from './util.js';

const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 500;
const COMMENT_COUNT = 20;
const SIMILAR_PHOTO_COUNT = 25;

const DESCRIPTIONS = [
  'Пляж у отеля',
  'Дорожный знак',
  'Побережье у гор',
  'Красивая девушка',
  'Суп с улыбающимся рисом',
  'Спортивная машина',
  'Разрезанная клубника',
  'Пролетающий самолёт над пляжем',
  'Обувная полка',
  'Плантация',
  'Ауди',
  'Салат с рыбой',
  'Кот завернутый в ролл',
  'Тапочки',
  'Горы с высоты полета',
  'Хор',
  'Старая машина',
  'Тапочки с подсветкой',
  'Пальмы около отеля',
  'Плов',
  'Берег моря',
  'Крабик',
  'Тусовка в клубе',
  'Сафари',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = ['Иван', 'Евгений', 'Александра', 'Дарья', 'Михаил', 'Светлана'];

const generateIdComment = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);

const createMessage = () => Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(COMMENTS)).join(' ');

const createComment = () => ({
  id: generateIdComment(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAME),
});

const createDescriptionPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createComment)
});

const createSimilarDescriptionPhoto = () => Array.from({length: SIMILAR_PHOTO_COUNT}, (_, index) => createDescriptionPhoto(index + 1));

export {createSimilarDescriptionPhoto};
