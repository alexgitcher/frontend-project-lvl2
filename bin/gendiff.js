#!/usr/bin/env node --experimental-json-modules

import { program } from 'commander';
import pckg from '../package.json';

import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version(pckg.version)
  .parse();

genDiff('gendiff');
