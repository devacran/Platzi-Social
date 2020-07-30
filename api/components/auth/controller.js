//Este controlador es el que hace las llamadas a la base de datos
const bcrypt = require("bcrypt");

const auth = require("../../../auth");
const TABLA = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    //si no hay store usa el mock
    store = require("../../../store/dummy");
  }
  //si el registro no existe, se ingresa, sino, se actualiza UPSERT!
  //solo se actualizan los campos que le llegan
  async function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLA, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username }); // devuelve la data del usuario o null
    return bcrypt.compare(password, data.password).then((sonIguales) => {
      if (sonIguales === true) {
        // Generar token;
        return auth.sign(data);
      } else {
        throw new Error("Informacion invalida");
      }
    });
  }

  return {
    login,
    upsert,
  };
};
