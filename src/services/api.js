import mockDivisions from "divisions";

const delay = (seconds = 0.5) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

export default {
  getDivisions: async () => {
    await delay();
    return mockDivisions;
  },
  editDivision: async () => {
    await delay();
  },
};
