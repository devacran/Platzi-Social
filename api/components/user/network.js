//Estos son LAS RUTAS DE /user
const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

// Routes
router.get("/", list);
router.get("/:id", get);
router.post("/", upsert); //registrar usuario
router.post("/follow/:id", secure("follow"), follow);
router.put("/", secure("update"), upsert); //actualizar usuario
// Internal functions
function list(req, res) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function get(req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function upsert(req, res) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}
function follow(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

module.exports = router;
