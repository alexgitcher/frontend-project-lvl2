import _ from 'lodash';

const getKeyState = (obj1, obj2, key) => {
  const val1 = obj1[key];
  const val2 = obj2[key];

  switch (true) {
    case _.isObject(val1) && _.isObject(val2):
      return 'unchanged';
    case _.has(obj1, key) && _.has(obj2, key) && val1 !== val2:
      return 'changed';
    case !val1:
      return 'added';
    case !val2:
      return 'deleted';
    default:
      return 'unchanged';
  }
};

const buildNode = ({ acc, props }) => ({ ...acc, [props.key]: { ...props } });

const buildAst = (obj1, obj2, depth = 1) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);

  return sortedKeys.reduce((acc, key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const state = getKeyState(obj1, obj2, key);
    const baseProps = { key, state, depth };

    switch (state) {
      case 'changed':
        return buildNode({ acc, props: { ...baseProps, value: val2, oldValue: val1 } });
      case 'added':
        return buildNode({ acc, props: { ...baseProps, value: val2 } });
      case 'deleted':
        return buildNode({ acc, props: { ...baseProps, value: val1 } });
      default: {
        return buildNode({
          acc,
          props: {
            ...baseProps,
            ...(_.isObject(val1) ? { children: buildAst(val1, val2, depth + 1) } : { value: val1 }),
          },
        });
      }
    }
  }, {});
};

export default buildAst;
