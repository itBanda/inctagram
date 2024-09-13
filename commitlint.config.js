module.exports = {
  parserPreset: {
    parserOpts: {
      headerCorrespondence: ['scope', 'type', 'subject'],
      headerPattern:
        /^([A-Z]+-\d+)\s(chore|build|ci|docs|feat|fix|init|perf|refactor|revert|style|test):\s(.+)$/,
    },
  },
  rules: {
    'header-case': [0, 'always'],
    'header-full-stop': [0, 'never'],
    'header-max-length': [2, 'always', 72],
    'header-min-length': [2, 'always', 10],
    'scope-case': [2, 'always', 'upper-case'],
    'scope-empty': [2, 'never'],
    'subject-case': [0],
    'subject-full-stop': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'init',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
}
