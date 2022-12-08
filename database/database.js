const Sequelize = require('sequelize')
const apiconfig = require('./apiconfig')

const connection = new Sequelize(apiconfig.bd,apiconfig.user,apiconfig.password, {
    host:apiconfig.host,
    dialect:apiconfig.dialect,
    timezone:apiconfig.timezone
})

module.exports = connection