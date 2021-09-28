import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const formatter = {
  json,
  plain,
  stylish,
};

const getFormatter = (format) => formatter[format];

export default getFormatter;
