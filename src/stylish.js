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

const formatPropertyStr = (node) => {
  const {
    key,
    value,
    oldValue,
    state,
    depth,
  } = node;

  const formattedOldValue = typeof oldValue === 'object' ? `{${objectToString(oldValue, depth + 1)}\n${defaultPad(depth)}}` : oldValue;

  if (typeof value === 'object' && value !== null) {
    return `${specialPad(depth, state)}${key}: {${objectToString(value, depth + 1)}\n${defaultPad(depth)}}`;
  }

  switch (state) {
    case 'added': {
      return `${specialPad(depth, state)}${key}: ${value}`;
    }
    case 'deleted': {
      return `${specialPad(depth, state)}${key}: ${value}`;
    }
    case 'changed': {
      return `${specialPad(depth, 'deleted')}${key}: ${formattedOldValue}\n${specialPad(depth, 'added')}${key}: ${value}`;
    }
    default: {
      return `${defaultPad(depth)}${key}: ${value}`;
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
