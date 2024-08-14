module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    camelcase: 'off',
    eqeqeq: ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': 0,
    'vue/multi-word-component-names': ['error', {
      ignores: ['index', 'dialogue', 'writing']// 需要忽略的组件名
    }]
  }

}
