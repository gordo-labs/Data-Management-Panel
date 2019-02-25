import Vue from 'vue'
import Vuex from 'vuex'
import data from './data/store-data';
import ui_actions from './ui-actions/store-ui-actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dialog: {
      show: false,
      title: "Dialog Title",
      text: "Dialog Text",
      action: '',
      acceptBool: true,
      cancelBool: true,
      acceptText: 'Agree',
      cancelText: 'Disagree',
      payload: {}
    }
  },
  getters: {
    DIALOG: (state) => {
      return state.dialog;
    },
  },
  mutations: {
    loadingStatus: (state, payload) => {
      state.loading = payload;
    },
    dialogStatus: (state, payload) => {
      state.dialog = payload;
    },
  },
  actions: {
    dialogAccept: (context, payload) => {
      context.dispatch(context.getters.DIALOG.action, context.getters.DIALOG.payload);
    },
  },
  modules: {
    ui_actions,
    data
  }
});
