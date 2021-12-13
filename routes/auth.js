const express = require("express");

const { getLogin, postLogin, postLogout, getSignup, postSignup, getResetPassword, postResetPassword, getNewPassword, postNewPassword } = require("../controllers/auth");

const router = express.Router();

router.get("/login", getLogin)

router.get("/signup", getSignup)

router.get("/reset-password", getResetPassword)

router.get("/new-password", getNewPassword)

router.post("/new-password", postNewPassword)

router.post("/reset-password", postResetPassword)

router.post("/signup", postSignup)

router.post("/login", postLogin)

router.post("/logout", postLogout)

module.exports = router;