import router from "@/router.js"
import baseService from "@/services/base-service";
import symbols from "../../testData/symbols"
import symbol from "../../testData/symbol"

const state = {
    base_list: [],
    filtered_list: [],
    risks:[],
    currencies: [],
    sel_Element:{
    }
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
        return state.base_list;
    },
    SELECTED_ELEMENT: (state) => {
        return state.sel_Element;
    },
};

const mutations = {
    filterListCat: (state, payload) => {
        let list;
      if (!!payload.risk && !!payload.currency) {
          console.log(1);
          list = state.filtered_list.filter(el => {
            if (payload.risk === el.risk_family && payload.currency === el.currency) {
              return true;
            }
          });
      } else if (!!payload.risk && !payload.currency) {
          console.log(2);
          list = state.filtered_list.filter(el => {
              if (payload.risk === el.risk_family && payload.currency === el.currency) {
                  return true;
              }
          });
      } else if (!payload.risk && !!payload.currency) {
          console.log(3);
          list = state.filtered_list.filter(el => {
              if (payload.risk === el.risk_family && payload.currency === el.currency) {
                  return true;
              }
          });
      } else {
          list = state.filtered_list;
      }
      console.log("Filtered list => ", list);
      state.filtered_list = list;
    },
    setListData: (state, payload) => {
      console.log("Lists => ",payload);
      state.base_list = payload;
    },
    setCategoriesData: (state, payload) => {
        let currencies = [], risks = [];
        state.base_list.forEach(el=>{
            
            if(!risks.includes(el.risk_family)){
                risks.push(el.risk_family);
            }
            if(!currencies.includes(el.currency)){
                currencies.push(el.currency);
            }
        });
        state.risks = risks;
        state.currencies = currencies;
        console.log('categories ',risks, currencies);
    },
    setFilteredListData: (state, payload) => {
      console.log("Lists Filtered => ",payload);
      state.base_list = payload;
    },
    setElementData: (state, payload) => {
      console.log("Element " + payload.id + "=> ", payload);
      state.sel_Element = payload;
    },
    addNote: (state, payload) => {
      console.log("Note => ", payload);
      let notes = state.sel_Element.notes;
      if (!!notes && notes.constructor === Array){
        notes.push(payload);
      } else{
          notes = [];
          notes.push(payload);
      }
      state.sel_Element.notes = notes;
      console.log(state.sel_Element.notes);
    },
    patchElement: (state, payload) => {
        console.log('COMMIT: patch element => ', payload);
        state.base_list.selected = payload;
        state.base_list = state.base_list.map(user => {
            if (user.id === payload.id) {
                user = payload;
            }
            return user;
        });
    },
};

const actions = {
    getListData: (context, payload) => {
        context.commit('setLoungesUILoading', true);
        baseService.getList().then(data => {
            console.log('Lists => ', data);
            context.commit('setListData', data.data);
            context.commit('setFilteredListData', data.data);
            context.commit('setCategoriesData');
        });
        // dummy data
        context.commit('setFilteredListData', symbols);
            context.commit('setCategoriesData');
    },
    getElementData: (context, payload) => {
        context.commit('setLoungesUILoading', true);
        baseService.getElement(payload.id).then(data => {
            console.log("Symbol " + "=> ", payload);
            context.commit('setElementData', data.data);
        });
        // dummy data
        context.commit('setElementData', symbol);
    },
    patchElement: (context, payload) => {
        console.log('ACTION: patchUser => ', payload)
        baseService.patchUser(payload).then(data => {
            console.log('RESPONSE: patchUser => ', data.data)
            context.commit('patchUser', data.data);
        });
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
}
