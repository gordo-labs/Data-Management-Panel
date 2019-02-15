import {
  store
} from '../store/store.js';

export default {
  modalBehaviour(title, text, action, payload, accept = true, cancel = true, acceptText, cancelText) {
    const object = {
      show: true,
      title: title,
      text: text,
      action: action,
      acceptBool: accept,
      cancelBool: cancel,
      acceptText: acceptText,
      cancelText: cancelText,
      payload: payload
    }
    store.commit('dialogStatus', object);
  },
  modalAccept() {
    store.dispatch('dialogAccept')
  },
  modalCancel() {

  }
}
