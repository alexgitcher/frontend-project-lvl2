import _ from 'lodash';

const defaultReplacer = '    ';
const specialReplacer = {
  added: '  + ',
  deleted: '  - ',
};

const defaultPad = (depth) => defaultReplacer.repeat(depth);
const specialPad = (depth, state) => `${defaultPad(depth - 1)}${specialReplacer[state]}`;

const objectToString = (obj, depth) => {
  const keys = _.keys(obj);

  const str = keys.reduce((acc, key) => {
    const value = obj[key];

    if (typeof value === 'object') {
      return `${acc}\n${defaultPad(depth)}${key}: {${objectToString(value, depth + 1)}\n${defaultPad(depth)}}`;
    }

    return `${acc}\n${defaultPad(depth)}${key}: ${value}`;
  }, '');

  return str;
};

const getFormattedValue = (value, depth) => {
  if (value === null) {
    return value;
  }

  if (typeof value === 'object') {
    return `{${objectToString(value, depth + 1)}\n${defaultPad(depth)}}`;
  }

  return value;
};

const formatPropertyStr = (node) => {
  const {
    key,
    value,
    oldValue,
    state,
    depth,
  } = node;

  const formattedOldValue = getFormattedValue(oldValue, depth);

  const formattedValue = getFormattedValue(value, depth);

  switch (state) {
    case 'added': {
      return `${specialPad(depth, state)}${key}: ${formattedValue}`;
    }
    case 'deleted': {
      return `${specialPad(depth, state)}${key}: ${formattedValue}`;
    }
    case 'changed': {
      return `${specialPad(depth, 'deleted')}${key}: ${formattedOldValue}\n${specialPad(depth, 'added')}${key}: ${formattedValue}`;
    }
    default: {
      return `${defaultPad(depth)}${key}: ${formattedValue}`;
    }
  }
};

const stylish = (ast) => {
  const iter = (tree) => {
    const keys = _.keys(tree);

    const data = keys.reduce((acc, key) => {
      const node = tree[key];
      const {
        depth,
        children,
      } = node;

      if (children) {
        return `${acc}\n${defaultPad(depth)}${key}: {${iter(children)}\n${defaultPad(depth)}}`;
      }

      return `${acc}\n${formatPropertyStr(node)}`;
    }, '');

    return data;
  };

  const result = iter(ast);

  return `{${result}\n}`;
};

export default stylish;
