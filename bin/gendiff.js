#!/usr/bin/env node --experimental-json-modules

import { program } from 'commander';
import pckg from '../package.json';

import genDiff from '../index.js';

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .version(pckg.version)
  .parse();

genDiff('gendiff');
