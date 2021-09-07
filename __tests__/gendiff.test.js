import { test, expect } from '@jest/globals';

import getFilePath from '../src/utils.js';

import genDiff from '../src/gendiff.js';

test('check diff', () => {
  const filepath1 = getFilePath('file1.json');
  const filepath2 = getFilePath('file2.json');

  const actual = genDiff(filepath1, filepath2);
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(actual).toEqual(expected);
});
