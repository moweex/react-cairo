const commitizenConfig = require('./.cz-config');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', commitizenConfig.types.map(type => type.value)],
  },
};
