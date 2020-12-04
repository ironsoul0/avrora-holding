import divisions from "../../services/divisions.json";

const deepCopy = (division) => {
  const { name, count, children } = division;
  const current = {
    name,
    count,
    expanded: true,
  };
  current.children = children.map((child) => deepCopy(child));
  return current;
};

const prepareData = (divisions) => {
  const a = {
    name: "root",
    children: divisions.map((division) => deepCopy(division)),
  };
  return a;
};

export default {
  actions: {
    async fetchPosts({ commit, dispatch }, limit = 3) {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=" + limit
      );
      const posts = await res.json();

      dispatch("sayHello");

      commit("updatePosts", posts);
    },
    sayHello() {},
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts;
    },
    createPost(state, newPost) {
      state.posts.unshift(newPost);
    },
    deleteDivision(state, path) {
      const divisions = { ...state.divisions };
      const last = path.pop();

      let target = divisions;
      path.forEach((currentIndex) => {
        target = target.children[currentIndex];
      });

      target.children.splice(last, 1);
      state.divisions = divisions;
    },
  },
  state: {
    divisions: prepareData(divisions),
  },
  getters: {
    divisions(state) {
      return state.divisions;
    },
    validPosts(state) {
      return state.posts.filter((p) => {
        return p.title && p.body;
      });
    },
    allPosts(state) {
      return state.posts;
    },
    postsCount(state, getters) {
      return getters.validPosts.length;
    },
  },
};
