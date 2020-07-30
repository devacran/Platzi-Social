const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret
//Para firmar el token
function sign(data) {
    return jwt.sign(data, secret)
}
//Para verificarlo
function verify(token) {
    //devuelve un objeto con la informacion que fue creada con ese token
    return jwt.verify(token, secret)
}

//This function will verify if the owner id is equal to the id into the token
const check = {
    //owner is an id
    own: function (req, owner) {
        const decoded = decodeHeader(req)
        console.log(decoded)

        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401)
        }
    },

    logged: function (req, owner) {
        const decoded = decodeHeader(req)
    },
}
//Para obtener el token (quita la parte de 'Bearer' del string del token)
function getToken(auth) {
    if (!auth) {
        throw error('Token is required', 401)
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Token Invalid', 401)
    }

    let token = auth.replace('Bearer ', '')
    return token
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = verify(token)

    req.user = decoded
    //retorna un objeto con la info del user
    return decoded
}

module.exports = {
    sign,
    check,
}
