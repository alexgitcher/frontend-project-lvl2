import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';

import getFilePath from '../src/utils.js';

import genDiff from '../src/gendiff.js';

const resultFilepath = getFilePath('result.txt');
const expected = readFileSync(resultFilepath, 'utf-8').trim();

test('check json diff', () => {
  const filepath1 = getFilePath('file1.json');
  const filepath2 = getFilePath('file2.json');

  const actual = genDiff(filepath1, filepath2);

  expect(actual).toEqual(expected);
});

test('check yaml diff', () => {
  const filepath1 = getFilePath('file1.yaml');
  const filepath2 = getFilePath('file2.yaml');

  const actual = genDiff(filepath1, filepath2);

  expect(actual).toEqual(expected);
});

test('check yml diff', () => {
  const filepath1 = getFilePath('file1.yml');
  const filepath2 = getFilePath('file2.yml');

  const actual = genDiff(filepath1, filepath2);

  expect(actual).toEqual(expected);
});

test('check json & yaml diff', () => {
  const filepath1 = getFilePath('file1.json');
  const filepath2 = getFilePath('file2.yaml');

  const actual = genDiff(filepath1, filepath2);

  expect(actual).toEqual(expected);
});
