import { readFileSync } from 'fs';
import { describe, test, expect } from '@jest/globals';

import getFilePath from '../src/utils.js';

import genDiff from '../src/gendiff.js';

describe('check stylish diff', () => {
  const resultFilepath = getFilePath('stylish-result.txt');
  const expected = readFileSync(resultFilepath, 'utf-8').trim();

  test('json diff', () => {
    const filepath1 = getFilePath('file1.json');
    const filepath2 = getFilePath('file2.json');

    const actual = genDiff(filepath1, filepath2);

    expect(actual).toEqual(expected);
  });

  test('yaml diff', () => {
    const filepath1 = getFilePath('file1.yaml');
    const filepath2 = getFilePath('file2.yaml');

    const actual = genDiff(filepath1, filepath2);

    expect(actual).toEqual(expected);
  });

  test('yml diff', () => {
    const filepath1 = getFilePath('file1.yml');
    const filepath2 = getFilePath('file2.yml');

    const actual = genDiff(filepath1, filepath2);

    expect(actual).toEqual(expected);
  });

  test('json & yaml diff', () => {
    const filepath1 = getFilePath('file1.json');
    const filepath2 = getFilePath('file2.yaml');

    const actual = genDiff(filepath1, filepath2);

    expect(actual).toEqual(expected);
  });
});

describe('check plain diff', () => {
  const resultFilepath = getFilePath('plain-result.txt');
  const expected = readFileSync(resultFilepath, 'utf-8').trim();

  test('json diff', () => {
    const filepath1 = getFilePath('file1.json');
    const filepath2 = getFilePath('file2.json');

    const actual = genDiff(filepath1, filepath2, 'plain');

    expect(actual).toEqual(expected);
  });

  test('yaml diff', () => {
    const filepath1 = getFilePath('file1.yaml');
    const filepath2 = getFilePath('file2.yaml');

    const actual = genDiff(filepath1, filepath2, 'plain');

    expect(actual).toEqual(expected);
  });

  test('yml diff', () => {
    const filepath1 = getFilePath('file1.yml');
    const filepath2 = getFilePath('file2.yml');

    const actual = genDiff(filepath1, filepath2, 'plain');

    expect(actual).toEqual(expected);
  });

  test('json & yaml diff', () => {
    const filepath1 = getFilePath('file1.json');
    const filepath2 = getFilePath('file2.yaml');

    const actual = genDiff(filepath1, filepath2, 'plain');

    expect(actual).toEqual(expected);
  });
});
