//Aqui el store(base de datos) es inyectada al controlador
//Para que la app sea escalabe y se pueda cambiar la db en un futuro si se desea
// const store = require("../../../store/mysql"); Esta era para la local
const config = require('../../../config')

let store, cache
if (config.remoteDB === true) {
    //SI estamos usando remotas usamos estas
    store = require('../../../store/remote-mysql')
    cache = require('../../../store/remote-cache') //Son la misma porque solo se hizo el cache en local
} else {
    store = require('../../../store/mysql')
    cache = require('../../../store/redis')
}

const ctrl = require('./controller')

module.exports = ctrl(store, cache)
