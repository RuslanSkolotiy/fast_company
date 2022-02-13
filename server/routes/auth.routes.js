const {generateUserData} = require("../utils/Helpers")
const TokenService = require("../services/tokenService")
const express = require('express')
const router = express.Router({mergeParams: true})
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')

const signUpValidations = [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Некорректный пароль').exists().isLength({min: 8}),
]

router.post('/signUp', [
    ...signUpValidations,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400,
                        errors: errors.array()
                    }
                })
            }
            const {email, password} = req.body
            const existingUser = await User.findOne({email});
            if (existingUser) {
                return res.status(400).json({
                    error: {
                        message: 'EMAIL_EXIST',
                        code: 400
                    }
                })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = await User.create({
                ...generateUserData(),
                ...req.body,
                password: hashedPassword,
            })

            const tokens = TokenService.generate({_id: newUser._id})
            await TokenService.save(newUser._id, tokens.refreshToken)

            res.status(201).send({...tokens, userId: newUser._id})

        } catch (e) {
            res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже ' + e.message})
        }
    }])

router.post('/signInWithPassword', [...signUpValidations, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: {
                    message: 'INVALID_DATA',
                    code: 400,
                    errors: errors.array()
                }
            })
        }

        const {email, password} = req.body
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(400).json({
                error: {
                    message: 'EMAIL_NOT_FOUND',
                    code: 400
                }
            })
        }

        const isPasswordEqual = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordEqual) {
            return res.status(400).json({
                error: {
                    message: 'INVALID_PASSWORD',
                    code: 400
                }
            })
        }

        const tokens = TokenService.generate({_id: existingUser._id})
        await TokenService.save(existingUser._id, tokens.refreshToken)
        res.status(200).send({...tokens, userId: existingUser._id})

    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже ' + e.message})
    }
}])

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

router.post('/token', async (req, res) => {
    try {

        const {refresh_token: refreshToken} = req.body
        const data = TokenService.validateRefresh(refreshToken)
        const dbToken = await TokenService.findToken(refreshToken)
        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({
                error: {
                    message: 'Unauthorized',
                    code: 401
                }
            })
        }

        const tokens = TokenService.generate({_id: data._id})
        await TokenService.save(data._id, tokens.refreshToken)
        res.status(200).send({...tokens, userId: data._id})

    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже ' + e.message})
    }
})

module.exports = router