//Esta es la que se conecta al miscroservicio de mysql que creamos.
//Ahora la base de datos esta en un microservicio.
//La api no sabe cual db hay por detras, cuales son las queries ni nada.
//Ya se hizo todo independiente

const remote = require('./remote')
const config = require('../config')

module.exports = new remote(config.mysqlService.host, config.mysqlService.port)
