module.exports = {
  extends: ["@it-incubator/eslint-config", "next/core-web-vitals"],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "react/jsx-curly-brace-presence": [
      'error',
      { children: 'never', propElementValues: 'ignore', props: 'never' },
    ],
  },
};
