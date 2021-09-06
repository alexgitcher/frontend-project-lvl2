#!/usr/bin/env node --experimental-json-modules --no-warnings

import { program } from 'commander';
import pckg from '../package.json';

import genDiff from '../index.js';

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .version(pckg.version)
  .action((filepath1, filepath2) => genDiff(filepath1, filepath2))
  .parse();
