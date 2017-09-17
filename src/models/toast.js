import request from "../utils/defaultReqOptions";

export default {

  namespace: 'toast',

  state: {
    msg: "",
    type: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line

    },
  },

  effects: {
  },

  reducers: {
    showToast(state, action) {
        console.log(action,state);
        return { ...state, ...action.details };
    },
    clearToast(state,action){
      return {msg: "",type:""};
    }
  },
};
