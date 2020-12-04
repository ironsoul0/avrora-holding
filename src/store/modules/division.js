import divisions from "../../services/divisions.json";

const deepCopy = (division) => {
  const { name, count, children } = division;
  const current = {
    name,
    count,
    expanded: false,
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

const findTargetByPath = (oldDivisions, path) => {
  const divisions = { ...oldDivisions };
  const last = path.pop();

  let target = divisions;
  path.forEach((currentIndex) => {
    target = target.children[currentIndex];
  });

  return { target, divisions, last };
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
      const { target, divisions, last } = findTargetByPath(
        state.divisions,
        path
      );
      target.children.splice(last, 1);
      state.divisions = divisions;
    },
    toggleExpandDivision(state, path) {
      const { target, divisions, last } = findTargetByPath(
        state.divisions,
        path
      );
      target.children[last].expanded = !target.children[last].expanded;
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
