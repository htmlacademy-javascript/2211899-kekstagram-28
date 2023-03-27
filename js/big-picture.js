import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const cancelPictureButtonElement = bigPictureElement.querySelector('.cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContainerElement = document.querySelector('.social__comments');
const commentCountElement = document.querySelector('.social__comment-count');
const commentLoaderButtonElement = document.querySelector('.comments-loader');

const renderComments = (comments) => {
  commentCountElement.textContent = comments.length;
  const commentFragment = document.createDocumentFragment();
  for (const comment of comments) {
    const commentElement = commentTemplate.cloneNode(true);
    const pictureElement = commentElement.querySelector('.social__picture');
    pictureElement.src = comment.avatar;
    pictureElement.alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentFragment.appendChild(commentElement);
  }

  commentsContainerElement.appendChild(commentFragment);
  commentsContainerElement.classList.remove('hidden');
  commentCountElement.classList.add('hidden'); //В следующем задании сделаем
  commentLoaderButtonElement.classList.add('hidden');
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const showBigPicture = ({url, likes, description, comments}) => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsContainerElement.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  renderComments(comments);
  cancelPictureButtonElement.addEventListener('click', () => {
    closeBigPicture();
  });
  document.addEventListener('keydown', onDocumentKeydown);
};

export {showBigPicture};
