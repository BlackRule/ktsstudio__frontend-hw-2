const { toBabelAliases } = require('./tsconfig.paths.js')
const plugins = [
  [
    'module-resolver',
    {
      alias: toBabelAliases(),
      root: ['./src']
    }
  ],
  ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ['@babel/plugin-proposal-private-methods', { loose: true }],
  '@babel/plugin-proposal-optional-chaining',
  process.env.NODE_ENV === 'development' && 'react-refresh/babel',
].filter(Boolean)

const presets = [
  '@babel/preset-env',
  ['@babel/preset-react', { runtime: 'automatic' }],
  '@babel/preset-typescript',
  'mobx',
]

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV) //Кэшировать в зависимости от process.env.NODE_ENV
  return {
    plugins,
    presets,
  }
}
