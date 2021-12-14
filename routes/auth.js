const express = require("express");

const { getLogin, postLogin, postLogout, getSignup, postSignup, getResetPassword, postResetPassword, getNewPassword, postNewPassword } = require("../controllers/auth");

const { body } = require("express-validator")

const router = express.Router();

router.get("/login", getLogin)

router.get("/signup", getSignup)

router.get("/reset-password", getResetPassword)

router.get("/new-password", getNewPassword)

router.post("/new-password", postNewPassword)

router.post("/reset-password", postResetPassword)

router.post("/signup",
    body('email').isEmail().normalizeEmail().withMessage("Invalid email address"),
    body('password').isLength({ min: 8 }).trim().withMessage("Password must be at lease 8 characters long."),
    body('confirm_password').trim().custom((value, { req }) => {
        if (value !== req.body.password)
            return Promise.reject("Passwords do not match")
        return true
    })
    , postSignup)

router.post("/login",
    body('email').isEmail().normalizeEmail().withMessage("Invalid Email Address!"),
    body('password').isLength({ min: 8 }).trim().withMessage("Password must be atleast 8 digits long")
    , postLogin)

router.post("/logout", postLogout)

module.exports = router;