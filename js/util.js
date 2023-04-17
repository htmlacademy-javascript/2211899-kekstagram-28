const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertBlock = document.createElement('div');
  alertBlock.style.zIndex = 100;
  alertBlock.style.position = 'absolute';
  alertBlock.style.top = 0;
  alertBlock.style.left = 0;
  alertBlock.style.right = 0;
  alertBlock.style.padding = '10px 3px';
  alertBlock.style.fontSize = '26px';
  alertBlock.style.textAlign = 'center';
  alertBlock.style.backgroundColor = 'red';

  alertBlock.textContent = message;

  document.body.append(alertBlock);

  setTimeout(() => {
    alertBlock.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, isEscapeKey, showAlert, debounce};
