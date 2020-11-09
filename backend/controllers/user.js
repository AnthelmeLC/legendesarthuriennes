const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
    //hashage du mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(passwordHashed => {
        //création du nouvel utilisateur
        const user = new User({
            ...req.body,
            password : passwordHashed,
            moderator : false,
            admin : false
        });
        //ajout du nouvel utilisateur à la base de données
        user.save()
        .then(() => res.status(201).json({message : "Utilisateur créé."}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    //recherche de l'utilisateur dans la base de données
    User.findOne({email : req.body.email})
    .then(user => {
        //si l'utilisateur n'existe pas
        if(!user){
            return res.status(401).json({error : "Identifiants incorrects."});
        }
        //si l'utilisateur existe
        //vérification du mot de passe
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            //si le mot de passe est incorrect
            if(!valid){
                return res.status(401).json({error : "Identifiants incorrects."});
            }
            //si le mot de passe est correct
            //création du token de session
            res.status(200).json({
                userId : user._id,
                token : jwt.sign({userId : user._id}, /* String de chiffrage, */ {expiresIn : "24h"})
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};