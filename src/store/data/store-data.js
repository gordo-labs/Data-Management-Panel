import router from "@/router.js"
import baseService from "@/services/base-service";

const state = {
    base_list: [],
    filtered_list: [],
    risks:[],
    currencies: [],
    sel_Element:{
    },
    next_Element:{},
    notesByElement:[]
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
    NOTES: (state) => {
        return state.sel_Element.notes;
    },
    NEXT_ELEMENT: (state) => {
        return state.next_Element;
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
    setElementData: (state, payload, context) => {
      state.sel_Element = payload;
      //notes
      state.sel_Element.notes = state.notesByElement.filter(item =>{
          if(payload.id === item.id){
              console.log('notes', item.notes);
            return item;
          };
        });
       
       // chart Data
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
      state.sel_Element.notes.push(payload);
      state.notesByElement.push(payload);
    },
    moveArray: (state, payload) => {
        // state.element_UI.loading = true;
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
                state.next_Element = state.base_list[moved];
                history.pushState(
                    {},
                    null,
                    '/element/' + state.next_Element.id
                );
                router.push({ name: 'element', params: { id: state.next_Element.id } });
                // window.history.pushState({url: "/element/" + state.next_Element.id}, "", "");
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
    },
    getElementData: (context, payload) => {
        context.commit('setElementLoading', false);
        baseService.getElement(payload).then(data => {
            console.log("Element " + "=> ", payload);
            context.commit('setElementData', data);
            context.commit('setElementLoading', true);
            context.commit('setElementNoteLoading', true);
        });
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}
