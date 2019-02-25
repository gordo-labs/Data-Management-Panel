

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
        is_loaded:null,
        notes_loaded: null,
        chart_loaded: null
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
        state.element_UI.is_loaded = payload;
    },
    setElementNoteLoading: (state, payload) => {
        state.element_UI.notes_loaded = payload;
    },
    setElementChartLoading: (state, payload) => {
        state.element_UI.chart_loaded = payload;
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
