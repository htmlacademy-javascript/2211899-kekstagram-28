import {showBigPicture} from './big-picture.js';

const picturePlace = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const showPosts = (posts) => {
  const postsFragment = document.createDocumentFragment();

  for (const post of posts) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
    postsFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => {
      showBigPicture(post);
    });
  }
  picturePlace.appendChild(postsFragment);
};

export {showPosts};
