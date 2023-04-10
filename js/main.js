import {showPosts} from './miniature.js';
import {initForm} from './form.js';
import { getData } from './api.js';
import { init, getFilter } from './filters.js';
import { showAlert } from './util.js';

initForm();
getData()
  .then((data) => {
    init(data, showPosts);
    showPosts(getFilter());
  }).catch(
    (err) => {
      showAlert(err.message);
    }
  );
