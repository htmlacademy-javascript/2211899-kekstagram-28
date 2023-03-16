const picturePlace = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const showPosts = (posts) => {
  const postsFragment = document.createDocumentFragment();

  for (const post of posts) {
    const {url, likes, comments} = post;
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    postsFragment.appendChild(pictureElement);
  }
  picturePlace.appendChild(postsFragment);
};

export {showPosts};
