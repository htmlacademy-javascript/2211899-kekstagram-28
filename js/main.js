import {showPosts} from './miniature.js';
import {createSimilarDescriptionPhoto} from './data.js';
import {initForm} from './form.js';


const posts = createSimilarDescriptionPhoto();
showPosts(posts);
initForm();

