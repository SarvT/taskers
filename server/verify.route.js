const { sendSms, health } = require("./verify.controller")

const Router = require("express").Router
const router = Router()

router.route("/send-sms").post(sendSms)
router.route("/health").post(health)

module.exports = router

