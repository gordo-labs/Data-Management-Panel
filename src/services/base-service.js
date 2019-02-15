import {
  HTTP
} from "./http-common";
import axios from "axios";

let config = {
  headers: {
    'Content-Type': 'application/json',
    'JsonStub-User-Key': '9facef2e-9583-4a83-9f08-c87159f1c113',
    'JsonStub-Project-Key': '6ed070c1-b334-4612-8fa8-169c5e45baef',
    'Access-Control-Allow-Origin': '*'
  },
  data:{}
};

export default {
  getList2() {
    return HTTP.get("/etsfintech/symbols/", {data:{}});
  },
  getList() {
    return axios.get('/etsfintech/symbols/',
        {}, // the data to post
        { headers: {
            'Content-Type': 'application/json',
            'JsonStub-User-Key': '9facef2e-9583-4a83-9f08-c87159f1c113',
            'JsonStub-Project-Key': '6ed070c1-b334-4612-8fa8-169c5e45baef',
          }
        });
  },
  getElement(id) {
    return HTTP.get("/etsfintech/symbols/" + id);
  },
};
