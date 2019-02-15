import axios from 'axios'
import {
  store
} from '../store/store.js'

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['JsonStub-User-Key'] = '9facef2e-9583-4a83-9f08-c87159f1c113';
axios.defaults.headers.common['JsonStub-Project-Key'] = '6ed070c1-b334-4612-8fa8-169c5e45baef';

// require('axios-debug')(axios);

export const HTTP = axios.create({
  baseURL: 'http://jsonstub.com/',
});
