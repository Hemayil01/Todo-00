const express = require("express")
const { getCountry, createCountry } = require("../services/country.s")
const validateMiddleware = require("../middlewares/validator.m")
const { CountrySchema } = require("../schema/country.schema")

const router = express.Router()

router.get("/", getCountry)
router.post("/", validateMiddleware(CountrySchema), createCountry)

module.exports = router