const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(err => next(err))
  }
}

export default catchErrors
