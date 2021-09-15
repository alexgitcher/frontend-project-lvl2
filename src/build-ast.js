import _ from 'lodash';

const buildAst = (obj1, obj2, depth = 1) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);

  const ast = sortedKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        ...acc,
        [key]: {
          key,
          state: 'unchanged',
          depth,
          children: buildAst(value1, value2, depth + 1),
        },
      };
    }

    if ((_.has(obj1, key) && _.has(obj2, key)) && value1 !== value2) {
      return {
        ...acc,
        [key]: {
          key,
          value: value2,
          oldValue: value1,
          depth,
          state: 'changed',
        },
      };
    }

    if (value1 === undefined) {
      return {
        ...acc,
        [key]: {
          key,
          value: value2,
          depth,
          state: 'added',
        },
      };
    }

    if (value2 === undefined) {
      return {
        ...acc,
        [key]: {
          key,
          value: value1,
          depth,
          state: 'deleted',
        },
      };
    }

    return {
      ...acc,
      [key]: {
        key,
        value: value1,
        depth,
        state: 'unchanged',
      },
    };
  }, {});

  return ast;
};

export default buildAst;
