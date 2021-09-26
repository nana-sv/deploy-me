const { body, validationResult } = require("express-validator");

const registerValidator = [
  body('username').isLength({ min: 5, max: 12 }), 
  body('email').isEmail(), 
  body('password').isLength({ min: 5, max: 20 }),
]

const loginValidator = [
  body('email').isEmail(), 
  body('password').isLength({ min: 5, max: 20 })
]

const validationErrorsHandler = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array())
    return res.status(400).send({ msg: `***ERROR: ${errors.array()[0].param} has an ${errors.array()[0].msg}` });
  }
  next();
}

module.exports = {
  registerValidator, loginValidator, validationErrorsHandler
}
