import { debounce } from './util.js';

const FILTER_PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
const postsContainerElement = document.querySelector('.pictures');

let currentFilter = Filter.DEFAULT;
let posts = [];

const sortRandom = () => Math.random() - 0.5;
const sortDISCUSSED = (pictureFirst, pictureNext) => pictureNext.comments.length - pictureFirst.comments.length;

const clearOldPosts = () => {
  const postsElement = postsContainerElement.querySelectorAll('.picture');

  postsElement.forEach((post) => {
    post.remove();
  });
};

const getFilter = () => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return [...posts].sort(sortRandom).slice(0,FILTER_PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...posts].sort(sortDISCUSSED);
    default:
      return [...posts];
  }
};

const setOnFilterClick = (cb) => {
  const debouncedCallBack = debounce(cb);
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    if (evt.target.id === currentFilter) {
      return;
    }
    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    clearOldPosts();
    debouncedCallBack(getFilter());
  });
};

const initFilters = (data, cb) => {
  filterElement.classList.remove('img-filters--inactive');
  posts = [...data];
  setOnFilterClick(cb);
};

export { initFilters, getFilter };
