const express = require("express")
const User = require("../model/userModel")
const router = express.Router();
const getToken = require("../util.js")


router.post("/register", async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const pass = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (pass !== confirmPassword) {
        return res.send(null)
    }

    const emailExisted = await User.findOne({
        email: email
    })

    if (emailExisted) {
        return res.status(401).send("Email existed")
    }

    const newUser = new User({
        name: userName,
        email: email,
        password: pass
    })


    const userCreated = await newUser.save();
    if (userCreated) {
        return res.send({
            _id: userCreated.id,
            name: userCreated.name,
            email: userCreated.email,
            isAdmin: userCreated.isAdmin,
            token: getToken.getToken(userCreated)
        })
    }
    else {
        return res.status(401).send("Email existed")
    }
})

router.post("/signin", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.pass
    })
    // console.log(signinUser)
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken.getToken(signinUser)
        })
    } else {
        res.status(401).send("Invalid email or password")
    }
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Duc Pham',
            email: 'ducmpham17@augustana.edu',
            password: '1234',
            isAdmin: 'true'
        })

        const newUser = await user.save();
        res.send(newUser)
    } catch (error) {
        res.send({ msg: error.message })
    }

})

module.exports = router;

