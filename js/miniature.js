import {showBigPicture} from './big-picture.js';

const picturePlaceElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const showPosts = (posts) => {
  const postsFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
    postsFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => {
      showBigPicture(post);
    });
  });
  picturePlaceElement.appendChild(postsFragment);
};

export {showPosts};
