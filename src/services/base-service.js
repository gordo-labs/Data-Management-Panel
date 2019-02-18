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
};

export default {
  getList() {
      return new Promise((resolve , reject) =>{
          fetch('http://jsonstub.com/etsfintech/symbols',config)
              .then(function(response) {
                  resolve(response.json());
              })
      });
  },
  getElement(id) {
      return new Promise((resolve , reject) =>{
          fetch('http://jsonstub.com/etsfintech/symbols/' + id,config)
              .then(function(response) {
                  resolve(response.json());
              })
      });
  },
};
