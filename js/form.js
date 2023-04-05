import { isEscapeKey, showAlert } from './util.js';
import { pristine } from './validation.js';
import { resetEffects } from './picture-effect.js';
import { resetScale } from './picture-size.js';
import { sendData } from './api.js';
import { showSuccessMessage } from './show-massage.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

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
const submitButton = uploadForm.querySelector('.img-upload__submit');


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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

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
};

const initForm = () => {
  uploadFile.addEventListener('change', () => {
    showModal();
  });
};

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          blockSubmitButton();
          showSuccessMessage();
        },
        () => {
          showAlert();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};


export {initForm, setUserFormSubmit, closeModal, onDocumentKeydown};
