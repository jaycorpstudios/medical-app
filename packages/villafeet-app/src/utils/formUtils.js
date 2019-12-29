const extractValues = (data = {}) => Object.keys(data).reduce((model, key) => {
  const newModel = { ...model };
  newModel[key] = data[key].value;
  return newModel;
}, {});

export default {
  extractValues,
};
