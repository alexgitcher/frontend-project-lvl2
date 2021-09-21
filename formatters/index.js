import plain from './plain.js';
import stylish from './stylish.js';

const formatter = {
  plain,
  stylish,
};

const getFormatter = (format) => formatter[format];

export default getFormatter;
