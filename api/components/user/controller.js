//Este controlador es el que hace las llamadas a la base de datos
const { nanoid } = require('nanoid')
const auth = require('../auth')

const TABLA = 'user'

module.exports = function (injectedStore, injectedCache) {
    //inyectamos la db y la db del cache
    let store = injectedStore
    let cache = injectedCache
    if (!store) {
        //Si no hay db usamos la dummy... aqui puede ir una db de respaldo
        store = require('../../../store/dummy')
    }
    if (!cache) {
        cache = require('../../../store/dummy')
    }

    async function list() {
        let users = await cache.list(TABLA) //verifica si hay cache

        if (!users) {
            console.log('No estaba en caché. Buscado en DB')
            users = await store.list(TABLA)
            cache.upsert(TABLA, users) //si no hay lo guarda en cache para la proxima consulta
        } else {
            console.log('Nos traemos datos de cache')
        }

        return users
    }

    function get(id) {
        return store.get(TABLA, id)
    }
    /*
Registro: name, username, password y el id se genera
Cambio Password:
*/
    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }
        //Si el cuerpo ya trae un id lo pone sino lo crea
        if (body.id) {
            user.id = body.id
        } else {
            user.id = nanoid()
        }
        //Esto es por si queremos cambiar la contraseña o el username
        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }
        return store.upsert(TABLA, user)
    }
    function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        })
    }

    return {
        list,
        get,
        upsert,
        follow,
    }
}
