const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
// Todas tienen que estar validadas por el JWT
// Obtener eventos

const middleware = [
    check("x-token", "Token requerido").not().isEmpty(),
    validarCampos,
];

router.get(
    "/",
    middleware,
    getEventos
);

//Crear nuevo evento
router.post(
    "/",
    middleware,
    crearEvento
);

router.put("/:id",middleware, actualizarEvento);

//BOrrar evento
router.delete("/:id", middleware, eliminarEvento);



module.exports = router