const express = require('express')
const router = express.Router({mergeParams: true})
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')

router.patch('/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params;
        console.log(req.user)
        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
            res.send(updatedUser)
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже ' + e.message})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const list = await User.find();
        res.send(list)
    } catch (e) {
        res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже ' + e.message})
    }
})

module.exports = router