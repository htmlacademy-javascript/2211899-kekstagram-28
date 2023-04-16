import { isEscapeKey } from './util.js';
import { onDocumentKeydown } from './form.js';

const bodyElement = document.querySelector('body');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successElement = successMessageElement.cloneNode(true);
const errorElement = errorMessageElement.cloneNode(true);

const successButton = successElement.querySelector('.success__button');
const errorButton = errorElement.querySelector('.error__button');
const getMessage = () => document.querySelector('.error, .success');

const onSuccessAnywhereClick = (evt) => {
  if (evt.target === successElement) {
    const message = getMessage();
    message.remove();
    document.removeEventListener('click', onSuccessAnywhereClick);
    document.removeEventListener('keydown', onSuccessKeydown);
  }
};

const onErrorAnywhereClick = (evt) => {
  if (evt.target === errorElement) {
    const message = getMessage();
    message.remove();
    document.removeEventListener('click', onErrorAnywhereClick);
    document.removeEventListener('keydown', onErrorKeydown);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

function onSuccessKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (successElement) {
      const message = getMessage();
      message.remove();
    }
  }
}

function onErrorKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (errorElement) {
      const message = getMessage();
      message.remove();
      document.addEventListener('keydown', onDocumentKeydown);
    }
  }
}

const onSuccessButtonClick = () => {
  if (successElement) {
    const message = getMessage();
    message.remove();
  }
};

const onErrorButtonClick = () => {
  if (errorElement) {
    const message = getMessage();
    message.remove();
  }
};

const showSuccessMessage = () => {
  bodyElement.append(successElement);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessAnywhereClick);
};

const showErrorMessage = () => {
  bodyElement.append(errorElement);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorAnywhereClick);
};

successButton.addEventListener('click', onSuccessButtonClick);
errorButton.addEventListener('click', onErrorButtonClick);

export { showSuccessMessage, showErrorMessage };
