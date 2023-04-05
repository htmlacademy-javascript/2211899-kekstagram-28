import {showAlert} from './util.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = (onSuccess) => {
  fetch(
    `${BASE_URL}${Route.GET_DATA}`,
  )
    .then((response) => {
      if (!response.ok) {
        showAlert(`${ErrorText.GET_DATA}`);
      }
      return response.json();
    })
    .then((generatePhoto) => {
      onSuccess(generatePhoto);
    })
    .catch(() => {
      showAlert(`${ErrorText.GET_DATA}`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        showAlert(`${ErrorText.SEND_DATA}`);
      }
    }
    )
    .catch(() => {
      onFail(`${ErrorText.SEND_DATA}`);
    });

};

export {getData, sendData};
