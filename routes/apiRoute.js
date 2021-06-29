const express = require("express")
const router = express.Router()
const urlRoute = require("../routes/urlRoute")
router.use("/url", urlRoute)
module.exports = router
