const getOutputValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const formatPropertyStr = ({
  state, value, oldValue, property,
}) => {
  switch (state) {
    case 'added':
      return `Property '${property}' was added with value: ${getOutputValue(value)}\n`;
    case 'deleted':
      return `Property '${property}' was removed\n`;
    case 'changed':
      return `Property '${property}' was updated. From ${getOutputValue(oldValue)} to ${getOutputValue(value)}\n`;
    default:
      return '';
  }
};

const plain = (ast) => {
  const iter = (tree, path = []) => Object.keys(tree).reduce((acc, dataKey) => {
    const {
      state, value, oldValue, children,
    } = tree[dataKey];

    const propertyPath = path.concat(dataKey);
    const property = `${propertyPath.join('.')}`;

    if (children) {
      return `${acc}${iter(children, propertyPath)}`;
    }

    return `${acc}${formatPropertyStr({
      state, value, oldValue, property,
    })}`;
  }, '');

  const result = iter(ast).trim();

  return result;
};

export default plain;
