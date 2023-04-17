import {showPosts} from './miniature.js';
import {initForm} from './form.js';
import { getData } from './api.js';
import { initFilters, getFilter } from './filters.js';
import { showAlert } from './util.js';

initForm();
getData()
  .then((data) => {
    initFilters(data, showPosts);
    showPosts(getFilter());
  }).catch(
    (err) => {
      showAlert(err.message);
    }
  );
