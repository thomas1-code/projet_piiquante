const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");
require("dotenv").config();

const User = require("../models/User");

exports.signup = (req, res, next) =>{
    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, `${process.env.RANDOM_CRYPTOJS}`).toString();
    bcrypt.hash(req.body.password, 10)
        .then((hash) =>{
            const user = new User({
                email: emailCryptoJs,
                password: hash
            })
            user.save()
                .then (() => res.status(201).json( { message: "Votre compte a été créé !" }))
                .catch((error) => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) =>{
    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, `${process.env.RANDOM_CRYPTOJS}`).toString();
    User.findOne({ email: emailCryptoJs })
        .then((user) =>{
            if(!user){
                return res.status(401).json({ message: "Email ou passeword incorrect" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) =>{
                    if(!valid){
                        return res.status(401).json({ message: "Email ou passeword incorrect" })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.RANDOM_TOKEN,
                            { expiresIn: "24h" }
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
};