import { readFileSync } from 'fs';
import path from 'path';

import getFilePath from './utils.js';
import getParser from './parsers.js';
import buildAst from './build-ast.js';
import stylish from './stylish.js';

const getParsedFileData = (filepath) => {
  const fileExt = path.extname(filepath).slice(1);
  const parse = getParser(fileExt);

  return parse(readFileSync(filepath, 'utf-8'));
};

const genDiff = (path1, path2, format = 'stylish') => {
  const filepath1 = getFilePath(path1);
  const filepath2 = getFilePath(path2);

  const data1 = getParsedFileData(filepath1);
  const data2 = getParsedFileData(filepath2);

  const diff = buildAst(data1, data2);

  const formatter = {
    stylish,
  }[format];

  const formattedResult = formatter(diff);

  console.log(formattedResult);

  return formattedResult;
};

export default genDiff;
