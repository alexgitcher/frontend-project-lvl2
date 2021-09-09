import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

import getFilePath from './utils.js';
import getParser from './parsers.js';

const getParsedFileData = (filepath) => {
  const fileExt = path.extname(filepath).slice(1);
  const parse = getParser(fileExt);

  return parse(readFileSync(filepath, 'utf-8'));
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
    }
    if (value2 === undefined) {
      return {
        ...acc,
        [`- ${key}`]: value1,
      };
    }
    if (value1 !== value2) {
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
    .replace(regex, '');

  console.log(formattedResult);

  return formattedResult;
};

export default genDiff;
