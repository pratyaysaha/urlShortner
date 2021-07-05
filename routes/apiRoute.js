const express = require("express")
const router = express.Router()
const urlRoute = require("../routes/urlRoute")
const userRoute = require("../routes/userRoute")
router.use("/url", urlRoute)
router.use("/user", userRoute)
module.exports = router
