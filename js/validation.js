const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

const HASHTAG_REGEXP = new RegExp(HASHTAG_PATTERN);

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//Валидация хештегов

pristine.addValidator(
  hashtagInputElement,
  (value) => {
    /* Проверка значения на строковый тип */
    if (!value) {
      return true;
    }
    return value.startsWith('#');
  },
  'Строка должна начинаться с хэш-тега',
  8,
  true
);

pristine.addValidator(
  hashtagInputElement,
  (value) => {
    if (!value) {
      return true;
    }
    return !value.endsWith(' ');
  },
  'Конец строки не должен содержать пробелов',
  7,
  true
);

pristine.addValidator(
  hashtagInputElement,
  (value) => {
    if (!value) {
      return true;
    }
    const words = value.split(' ');
    return !words.some((word) => word === '');
  },
  'Хэш-теги разделяются одним пробелом',
  6,
  true
);

pristine.addValidator(
  hashtagInputElement,
  (value) => {
    if (!value) {
      return true;
    }
    const words = value.split(' ');
    return words.every((word) => word.length <= HASHTAG_MAX_LENGTH);
  },`Длина хештега не может превышать ${HASHTAG_MAX_LENGTH} символов.`,
  5,
  true
);

pristine.addValidator(
  hashtagInputElement,
  (value) => {
    if (!value) {
      return true;
    }
    const words = value.trim().split(' ');
    return words.every((word) => HASHTAG_REGEXP.test(word));
  },
  'Хештег должен состоять из символа #, цифр и букв.',
  4,
  true
);

pristine.addValidator(
  hashtagInputElement,
  (value) => {
    if (!value) {
      return true;
    }
    const words = value.toLowerCase().split(' ');
    const uniqueTags = new Set(words);
    return uniqueTags.size === words.length;
  },
  'Хештеги должны быть уникальными',
  3,
  true
);

pristine.addValidator(
  hashtagInputElement,
  (value) => {
    if (!value) {
      return true;
    }
    const words = value.split(' ');
    return words.length <= HASHTAGS_MAX_COUNT;
  },
  `Не более ${HASHTAGS_MAX_COUNT} тегов`,
  2,
  true
);

//Валидация комментариев

const checkStringLength = (string = '', length = 0) => string.length <= length;

pristine.addValidator(
  commentInputElement,
  (value) => checkStringLength(value, COMMENT_MAX_LENGTH),
  `Длина не должна превышать ${COMMENT_MAX_LENGTH} символов`,
  1,
  true
);

export {pristine};
