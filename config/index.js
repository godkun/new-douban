const host = process.env.host || 'localhost'
const env = process.env.NODE_ENV || 'development'
const config = require(`./env/${env}`).default

export default Object.assign({
  env,host
},config)
