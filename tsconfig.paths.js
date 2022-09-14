//https://gist.github.com/nerdyman/2f97b24ab826623bff9202750013f99e
const path = require('path')

const toBabelAliases = (tsconfigPath = './tsconfig.paths.json') => {
  const tsconfig = require(tsconfigPath)
  const { paths, baseUrl } = tsconfig.compilerOptions
  return Object.fromEntries(
    Object.entries(paths)
      .filter(([, pathValues]) => pathValues.length > 0)
      .map(([pathKey, pathValues]) => {
        const key = pathKey.replace('/*', '')
        const value = `./${baseUrl}/${pathValues[0].replace('/*', '')}`
        return [key, value]
      })
  )
}

const toEslintAliases = (tsconfigPath = './tsconfig.paths.json') => {
  const tsconfig = require(tsconfigPath)
  const { paths, baseUrl } = tsconfig.compilerOptions
  return Object.entries(paths)
    .filter(([, pathValues]) => pathValues.length > 0)
    .map(([pathKey, pathValues]) => {
      const key = pathKey.replace('/*', '')
      const value = path.resolve(
        path.dirname(tsconfigPath),
        baseUrl,
        pathValues[0].replace('/*', '')
      )
      return [key, value]
    })
 
}

const toWebpackAliases = (tsconfigPath = './tsconfig.paths.json') => {
  return Object.fromEntries(toEslintAliases(tsconfigPath))
}

module.exports = { toBabelAliases,toEslintAliases,toWebpackAliases }
