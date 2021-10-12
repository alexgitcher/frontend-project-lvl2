const defaultReplacer = '    ';
const specialReplacer = {
  added: '  + ',
  deleted: '  - ',
};

const buildPad = (depth, state) => {
  if (state) {
    return `${defaultReplacer.repeat(depth - 1)}${specialReplacer[state]}`;
  }

  return defaultReplacer.repeat(depth);
};

const objectToString = (obj, depth) => Object.keys(obj).reduce((acc, key) => {
  const value = obj[key];
  const pad = buildPad(depth);

  if (typeof value === 'object') {
    return `${acc}\n${pad}${key}: {${objectToString(value, depth + 1)}\n${pad}}`;
  }

  return `${acc}\n${pad}${key}: ${value}`;
}, '');

const getOutputValue = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    return `{${objectToString(value, depth + 1)}\n${buildPad(depth)}}`;
  }

  return value;
};

const formatPropertyStr = ({
  key, value, oldValue, state, depth,
}) => {
  const oldValueOutput = getOutputValue(oldValue, depth);
  const valueOutput = getOutputValue(value, depth);

  switch (state) {
    case 'added':
    case 'deleted':
      return `${buildPad(depth, state)}${key}: ${valueOutput}`;
    case 'changed':
      return `${buildPad(depth, 'deleted')}${key}: ${oldValueOutput}\n${buildPad(depth, 'added')}${key}: ${valueOutput}`;
    default:
      return `${buildPad(depth)}${key}: ${valueOutput}`;
  }
};

const stylish = (ast) => {
  const iter = (tree) => Object.keys(tree).reduce((acc, key) => {
    const node = tree[key];
    const { depth, children } = node;
    const pad = buildPad(depth);

    if (children) {
      return `${acc}\n${pad}${key}: {${iter(children)}\n${pad}}`;
    }

    return `${acc}\n${formatPropertyStr(node)}`;
  }, '');

  const result = iter(ast);

  return `{${result}\n}`;
};

export default stylish;
