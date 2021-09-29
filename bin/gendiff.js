#!/usr/bin/env node

import { program } from 'commander';

import genDiff from '../index.js';

const version = process.env.npm_package_version;

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .version(version)
  .action((filepath1, filepath2, { format }) => genDiff(filepath1, filepath2, format))
  .parse();
