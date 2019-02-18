import router from "@/router.js"
import baseService from "@/services/base-service";

const state = {
    base_list: [],
    filtered_list: [],
    risks:[],
    currencies: [],
    sel_Element:{
        notes: null
    },
    notesByElement:[
        {
            id: 0,
            notes: [{}]
        },
    ]
};

const getters = {
    BASE_LIST: (state) => {
        return state.base_list;
    },
    CURRENCIES: (state) => {
        return state.currencies;
    },
    RISKS: (state) => {
        return state.risks;
    },
    FILTERED_LIST: (state) => {
        return state.filtered_list;
    },
    SELECTED_ELEMENT: (state) => {
        return state.sel_Element;
    },
};

const mutations = {
    filterListCat: (state, payload) => {
        state.filtered_list = state.base_list;
      if (!!payload.risk && !!payload.currency) {
          state.filtered_list = state.filtered_list.filter(el => {
            if (payload.risk === el.risk_family && payload.currency === el.currency) {
              return true;
            }
          });
      } else if (!!payload.risk && payload.currency == null) {
          state.filtered_list = state.filtered_list.filter(el => {
              if (payload.risk === el.risk_family) {
                  return true;
              }
          });
      } else if (payload.risk === null && !!payload.currency) {
          state.filtered_list = state.filtered_list.filter(el => {
              if (payload.currency === el.currency) {
                  return true;
              }
          });
      } else{
          state.filtered_list = state.base_list;
      }
    },
    setListData: (state, payload) => {
      state.base_list = payload;
    },
    setCategoriesData: (state, payload) => {
        let currencies = [], risks = [];
        state.base_list.forEach(el => {
            if(!risks.includes(el.risk_family)){
                risks.push({name:el.risk_family});
            }
            if(!currencies.includes(el.currency)){
                currencies.push({name:el.currency});
            }
        });
        state.risks = risks;
        state.currencies = currencies;
    },
    setFilteredListData: (state, payload) => {
      state.filtered_list = payload;
    },
    setElementData: (state, payload) => {
      state.sel_Element = payload;
      state.sel_Element.notes = [];
    },
    setElementChartData: (state, payload) => {
       let prices = [], dates = [], chartData;
       state.sel_Element.prices.forEach(el => {
           dates.push(el.date);
           prices.push(el.value);
       });
       chartData = {prices, dates};
       state.sel_Element.chartData = chartData;
    },
    addNote: (state, payload) => {
      console.log("Note => ", payload);
      let notes = state.sel_Element.notes;
      if (!!notes && notes.constructor === Array) {
          notes.push(payload);
      } else {
          notes = [];
          notes.push(payload);
      }
      state.sel_Element.notes = notes;
      console.log(state.sel_Element.notes);
    },
    moveArray: (state, payload) => {
        state.element_UI.loading = true;
        console.log('COMMIT: moveInArray => ', payload);
        const id = state.sel_Element.id;
        const array = state.base_list;
        array.find((element, index) => {
            if (element.id === id) {
                console.log('realID', element.id);
                console.log('index', index);
                console.log('length', array.length);
                if (array.length - 1 === index && payload > 0) {
                    alert('There are no more elements ahead');
                    return;
                }
                if (index === 0 && payload < 0) {
                    alert('There are no more elements before');
                    return;
                }
                const moved = index + payload;
                console.log('next', moved);
                state.sel_Element = state.base_list[moved];
                router.push({ name: 'element', params: { id: moved } });
                // history.pushState(
                //     {},
                //     null,
                //     '/element/' + state.sel_Element.id
                // );
            }
        });
    },
};

const actions = {
    getListData: (context, payload) => {
        context.commit('setListUILoading', true);
        baseService.getList().then(data => {
            console.log('Lists => ', data);
            context.commit('setListData', data);
            context.commit('setFilteredListData', data);
            context.commit('setCategoriesData');
            context.commit('setListUILoading', false);
        });
        // dummy data
        // context.commit('setListData', symbols);
        // context.commit('setFilteredListData', symbols);
        // context.commit('setCategoriesData');
    },
    getElementData: (context, payload) => {
        context.commit('setElementLoading', true);
        baseService.getElement(payload).then(data => {
            console.log("Element " + "=> ", payload);
            context.commit('setElementData', data);
            context.commit('setElementChartData');
            context.commit('setElementLoading', false);
        });
        // dummy data
        // context.commit('setElementData', symbol);
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}
