import { isEscapeKey } from './util.js';
import { pristine } from './validation.js';
import { resetEffects } from './picture-effect.js';
import { resetScale } from './picture-size.js';
import { sendData } from './api.js';
import { showSuccessMessage } from './show-massage.js';


const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const bodyElement = document.querySelector('body');
const uploadModalElement = bodyElement.querySelector('.img-upload__overlay');
const uploadFileCloseElement = uploadModalElement.querySelector('.img-upload__cancel');
const uploadFormElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const hashtagsInputElement = document.querySelector('.text__hashtags');
const commentTextareaElement = document.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const fileChooserElement = document.querySelector('#upload-file');
const previewElement = document.querySelector('.img-upload__preview img');


const closeModal = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetEffects();
  resetScale();
  pristine.reset();
  uploadFormElement.reset();
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
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const showModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  uploadFileCloseElement.addEventListener('click', () => {
    closeModal();
  });
  // Отмена закрытия модального окана, когда фокус в поле ввода хеш-тегов
  hashtagsInputElement.addEventListener('keydown', onInputKeyDown);

  // Отмена закрытия модального окана, когда фокус в поле ввода комментариев
  commentTextareaElement.addEventListener('keydown', onInputKeyDown);
  document.addEventListener('keydown', onDocumentKeydown);
};

const setUserFormSubmit = (onSuccess) => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
        })
        .catch((err) => {
          showSuccessMessage(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

const initForm = () => {
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      previewElement.src = URL.createObjectURL(file);
      showModal();
    }
  });
  setUserFormSubmit();
};

export {initForm, closeModal, onDocumentKeydown};
