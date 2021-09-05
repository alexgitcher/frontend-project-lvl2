import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => {
  if (path.isAbsolute(filename)) {
    return filename;
  }
  return path.resolve(__dirname, '..', '__fixtures__', filename);
};

const parseByExt = {
  json: JSON.parse,
};

const getParsedFileData = (filepath) => {
  const fileExt = path.extname(filepath).slice(1);
  const parse = parseByExt[fileExt];

  return parse(readFileSync(filepath, 'utf-8'))
};

const genDiff = (path1, path2) => {
  const filepath1 = getFilePath(path1);
  const filepath2 = getFilePath(path2);

  const data1 = getParsedFileData(filepath1);
  const data2 = getParsedFileData(filepath2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const uniqKeys = _.uniq([...keys1, ...keys2]);
  const sortedKeys = _.sortBy(uniqKeys);

  const compare = sortedKeys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 === undefined) {
      return {
        ...acc,
        [`+ ${key}`]: value2,
      };
    } else if (value2 === undefined) {
      return {
        ...acc,
        [`- ${key}`]: value1,
      };
    } else if (value1 !== value2) {
      return {
        ...acc,
        [`- ${key}`]: value1,
        [`+ ${key}`]: value2,
      };
    }

    return {
      ...acc,
      [`  ${key}`]: value1,
    };
  }, {});

  const regex = new RegExp(/(,$)|"/gm);

  const formattedResult = JSON
    .stringify(compare, null, '  ')
    .replace(regex, "");

  console.log(formattedResult);
};

export default genDiff;
