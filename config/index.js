'strict'

// make a loader for config based on environment
const env = process.env.NODE_ENV || 'dev'

const config = require(`./${env}`)

console.log(`Loaded config for environment: ${env}`)

module.exports = config
