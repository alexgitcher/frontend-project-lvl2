const getOutputValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (ast) => {
  const iter = (tree, path = []) => {
    const keys = Object.keys(tree);

    const data = keys.reduce((acc, dataKey) => {
      const node = tree[dataKey];

      const {
        state,
        value,
        oldValue,
        children,
      } = node;

      const propertyPath = path.concat(dataKey);

      if (children) {
        return `${acc}${iter(children, propertyPath)}`;
      }

      const property = `${propertyPath.join('.')}`;

      switch (state) {
        case 'added': {
          return `${acc}Property '${property}' was added with value: ${getOutputValue(value)}\n`;
        }
        case 'deleted': {
          return `${acc}Property '${property}' was removed\n`;
        }
        case 'changed': {
          return `${acc}Property '${property}' was updated. From ${getOutputValue(oldValue)} to ${getOutputValue(value)}\n`;
        }
        default: {
          return acc;
        }
      }
    }, '');

    return data;
  };

  const result = iter(ast).trim();

  return result;
};

export default plain;
