import yaml from 'js-yaml';

const parserByFileExt = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const getParser = (fileExt) => parserByFileExt[fileExt];

export default getParser;
