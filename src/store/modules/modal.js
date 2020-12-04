export default {
  mutations: {
    toggleOpen(state) {
      state.isOpen = !state.isOpen;
    },
    changeEditPath(state, newPath) {
      state.isOpen = true;
      state.editPath = newPath;
    },
  },
  state: {
    isOpen: false,
    editPath: "",
  },
  getters: {
    isOpen(state) {
      return state.isOpen;
    },
    editPath(state) {
      return state.editPath;
    },
  },
};
