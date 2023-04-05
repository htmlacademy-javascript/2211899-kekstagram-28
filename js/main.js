import {showPosts} from './miniature.js';
import {initForm, setUserFormSubmit, closeModal} from './form.js';
import { getData } from './api.js';


initForm();
getData(showPosts);
setUserFormSubmit(closeModal);
