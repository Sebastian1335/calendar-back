const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const isDate = require("../helpers/isDate");

// Todas tienen que estar validadas por el JWT
// Obtener eventos

router.use(validarJWT);

router.get("/", getEventos);

//Crear nuevo evento
router.post(
    "/",
    [
        check("title", "El el titulo es obligatorio").not().isEmpty(),
        check("start", "La fecha de inicio es obligatorio").custom(isDate),
        check("end", "La fecha de fin es obligatorio").custom(isDate),
        validarCampos,
    ],
    crearEvento
);

router.put("/:id", [
    check("title", "El el titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatorio").custom(isDate),
    check("end", "La fecha de fin es obligatorio").custom(isDate),
    validarCampos,
], actualizarEvento);

//BOrrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
