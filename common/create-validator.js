const { celebrate } = require('celebrate');
const createValidator = schema => celebrate(schema);

module.exports = createValidator;