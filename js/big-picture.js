import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const cancelPictureButtonElement = bigPictureElement.querySelector('.cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContainerElement = document.querySelector('.social__comments');
const commentCountElement = document.querySelector('.social__comment-count');
const commentLoaderButtonElement = document.querySelector('.comments-loader');

let commentShown = 0;
let basicComments = null;
const commentCountAdd = 5;

const createComment = (comment) => {
  const { avatar, name, message } = comment;
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();

  const currentComments = basicComments.slice(commentShown, commentShown + commentCountAdd);

  currentComments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentsContainerElement.append(fragment);

  commentCountElement.childNodes[0].nodeValue = `${commentsContainerElement.children.length} комментариев из ${basicComments.length}`;

  if (commentsContainerElement.children.length === basicComments.length) {
    commentLoaderButtonElement.classList.add('hidden');
  }
};

const clearComments = () => {
  commentsContainerElement.innerHTML = '';
  commentShown = 0;
  basicComments = null;
};

const onCommentsLoaderClick = () => {
  commentShown += commentCountAdd;
  renderComments();
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
  clearComments();

  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  commentLoaderButtonElement.classList.remove('hidden');

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  commentCountElement.textContent = comments.length;

  basicComments = comments;

  renderComments();

  commentCountElement.textContent = comments.length;

  cancelPictureButtonElement.addEventListener('click', () => {
    closeBigPicture();
  });
  document.addEventListener('keydown', onDocumentKeydown);
  commentLoaderButtonElement.addEventListener('click', onCommentsLoaderClick);
};

export {showBigPicture};
