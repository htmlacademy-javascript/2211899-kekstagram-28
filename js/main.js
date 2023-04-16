import {showPosts} from './miniature.js';
import {initForm} from './form.js';
import { getData } from './api.js';
import { initinitialization, getFilter } from './filters.js';
import { showAlert } from './util.js';

initForm();
getData()
  .then((data) => {
    initinitialization(data, showPosts);
    showPosts(getFilter());
  }).catch(
    (err) => {
      showAlert(err.message);
    }
  );
