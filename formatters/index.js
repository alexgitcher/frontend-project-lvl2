import stylish from './stylish.js';

const formatter = {
  stylish,
};

const getFormatter = (format) => formatter[format];

export default getFormatter;
