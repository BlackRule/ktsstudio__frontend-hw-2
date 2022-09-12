const plugins = [
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    "@babel/plugin-proposal-optional-chaining",
    process.env.NODE_ENV === 'development' && 'react-refresh/babel'
].filter(Boolean)


const presets = [
    "@babel/preset-env",
    ["@babel/preset-react",{"runtime": "automatic"}],
    "@babel/preset-typescript",
    "mobx"
]

module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV); //Кэшировать в зависимости от process.env.NODE_ENV
    return {
        presets,
        plugins
    }
}




