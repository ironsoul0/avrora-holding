import divisions from "../../services/divisions.json";

const deepCopy = (division) => {
  const { name, count, children } = division;

  const childrenSum = children.reduce((acc, child) => {
    return acc + child.count;
  }, 0);

  const current = {
    name,
    count,
    fact: count - childrenSum,
    expanded: false,
  };
  current.children = children.map((child) => deepCopy(child));
  return current;
};

const prepareData = (divisions) => {
  return {
    name: "root",
    children: divisions.map((division) => deepCopy(division)),
  };
};

const generateNested = (
  divisions,
  combinations,
  currentText = [],
  currentPath = []
) => {
  if (currentPath.length > 0) {
    combinations.push({ text: currentText.join(" > "), path: currentPath });
  }

  divisions.children.forEach((child, index) => {
    generateNested(
      child,
      combinations,
      [...currentText, child.name],
      [...currentPath, index]
    );
  });
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
  mutations: {
    deleteDivision(state, path) {
      const { target, divisions, last } = findTargetByPath(
        state.divisions,
        path
      );
      const deleteCount = target.children[last].count;
      let current = divisions;

      path.forEach((currentIndex) => {
        current.children[currentIndex].count -= deleteCount;
        current = current.children[currentIndex];
      });

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
    addDivision(state, division) {
      const { name, fact, selected } = division;
      const divisions = { ...state.divisions };

      let target = divisions;
      selected.forEach((currentIndex) => {
        target = target.children[currentIndex];
        target.count += fact;
      });
      target.children.push({
        name,
        count: fact,
        fact,
        children: [],
      });
      state.divisions = divisions;
    },
    editDivision(state, newData) {
      const { name, fact, path } = newData;
      const divisions = { ...state.divisions };

      let target = divisions;
      path.forEach((currentIndex) => {
        target = target.children[currentIndex];
      });

      const diff = fact - target.fact;

      target = divisions;
      path.forEach((currentIndex) => {
        target = target.children[currentIndex];
        target.count += diff;
      });

      target.name = name;
      target.fact = fact;

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
    nestedDivisions(state) {
      const combinations = [];
      generateNested(state.divisions, combinations);
      return combinations;
    },
  },
};
