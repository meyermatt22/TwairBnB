
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  // console.log('validation HERE &&', validationErrors.errors[0])//.msg)// === 'User with that email already exists')

  // if (validationErrors.errors[0].msg !== undefined) {
  //   if(validationErrors.errors[0].msg === 'User with that email already exists') {
  //     const errors = {};
  //     validationErrors
  //       .array()
  //       .forEach(error => errors[error.param] = error.msg);

  //       const err = Error("User already exists");
  //       err.errors = errors;
  //       err.status = 500;
  //       err.title = "User already exists";
  //       next(err)
  //   }
  //   if(validationErrors.errors[0].msg === "User with that username already exists") {
  //     const errors = {};
  //     validationErrors
  //       .array()
  //       .forEach(error => errors[error.param] = error.msg);

  //       const err = Error("User already exists");
  //       err.errors = errors;
  //       err.status = 500;
  //       err.title = "User already exists";
  //       next(err)
  //   }

  // }


  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
    .array()
    .forEach(error => errors[error.param] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
