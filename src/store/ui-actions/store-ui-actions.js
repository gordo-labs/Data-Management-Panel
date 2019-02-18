

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
      list_UI:{
        notesButton: "Add Note",
        loading: false
      },
    element_UI:{
        loading:false
    }
};

const getters = {
  LIST_UI: (state) => {
    return state.list_UI;
  },
    ELEMENT_UI: (state) => {
    return state.element_UI;
  },
  CHART: (state) => {
    return state.chart;
  },
};

const mutations = {
    setListUILoading: (state, payload) => {
        state.list_UI.loading = payload
    },
    setElementLoading: (state, payload) => {
        state.element_UI.loading = payload;
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
