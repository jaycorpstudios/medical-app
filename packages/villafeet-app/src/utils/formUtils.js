export const extractValues = (data = {}) => {
  return Object.keys(data).reduce((model, key) => {
      model[key] = data[key].value;
      return model;
  },{});
}