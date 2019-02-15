const state = {
    dialog: {
        show: false,
        title: "Dialog Title",
        text: "Dialog Text",
        action: '',
        acceptBool: true,
        cancelBool: true,
        acceptText: 'Confirm',
        cancelText: 'Cancel',
        payload: {}
    },
  symbols_UI:{
    notesButton: "Add Note",
    loading: false
  },
};

const getters = {
  SYMBOLS_UI: (state) => {
    return state.symbols_UI;
  },
};

const mutations = {
  setSymbolsUILoading: (state, payload) => {
    state.loungesUI.loading = payload
  },
};

const actions = {

};

export default {
    state,
    mutations,
    getters,
    actions,
}
