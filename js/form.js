import { isEscapeKey } from './util.js';
import {pristine} from './validation.js';
import { resetEffects } from './picture-effect.js';
import { resetScale } from './picture-size.js';

const body = document.querySelector('body');
const uploadFile = body.querySelector('#upload-file');
const uploadModal = body.querySelector('.img-upload__overlay');
const uploadFileClose = uploadModal.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
// const effectLevelElement = document.querySelector('.effect-level');
// const effectsListElement = document.querySelector('.effects__list');
const overlay = document.querySelector('.img-upload__overlay');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

const closeModal = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetEffects();
  resetScale();
  uploadForm.reset();
};

const onInputKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {//Проверить, что инпут не в фокусе
    evt.preventDefault();
    closeModal();
  }
}

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadFileClose.addEventListener('click', () => {
    closeModal();
  });
  // Отмена закрытия модального окана, когда фокус в поле ввода хеш-тегов
  hashtagsInput.addEventListener('keydown', onInputKeyDown);

  // Отмена закрытия модального окана, когда фокус в поле ввода комментариев
  commentTextarea.addEventListener('keydown', onInputKeyDown);
  document.addEventListener('keydown', onDocumentKeydown);

  uploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
};

const initForm = () => {
  uploadFile.addEventListener('change', () => {
    showModal();
  });
};


export {initForm};
