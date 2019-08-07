function isObject(data) {
  return typeof data === 'object' && !(data instanceof Array) && !(data instanceof Date)
}

//Recursively updates values in a model
export function updateFieldsInModel({ model = {}, updatedData = {}, skipFields = [] } = {}) {
  for (const field in updatedData) {
    if (!skipFields.includes(field)) {
      model[field] = isObject(model[field])
        ? updateFieldsInModel({ model: model[field], updatedData: updatedData[field] })
        : updatedData[field]
    }
  }
  return model
}
