import Vue from "vue";
import Vuex from "vuex";

import division from "./modules/division";
import modal from "./modules/modal";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    division,
    modal,
  },
});
