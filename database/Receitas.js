const Sequelize = require('sequelize')
const connection = require('./database')

const Receitas = connection.define('receitas',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    category:{
        type: Sequelize.STRING,
        allowNull:false
    }

})

module.exports = Receitas;