const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
    //hashage du mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(passwordHashed => {
        //création du nouvel utilisateur
        User.create({
            pseudo : req.body.user.pseudo,
            password : passwordHashed
        })
        .then(() => res.status(201).json({message : "Utilisateur créé."}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    //recherche de l'utilisateur dans la base de données
    User.findOne({where : {pseudo : req.body.user.pseudo}})
    .then(user => {
        //si l'utilisateur n'existe pas
        if(user === null){
            return res.status(401).json({error : "Identifiants incorrects."});
        }
        //si l'utilisateur existe, on vérifie le mot de passe
        else{
            bcrypt.compare(req.body.user.password, user.password)
            .then(valid => {
                //si le mot de passe est incorrect
                if(!valid){
                    return res.status(401).json({error : "Identifiants incorrects."});
                }
                //si le mot de passe est correct
                res.status(200).json({
                    userId : user.id,
                    token : jwt.sign({userId : user.id}, "HbI8sqVP2IDEsEmSpAKM", {expiresIn : "30 dayes"}),
                    admin : user.admin
                });
            })
            .catch(error => res.status(500).json({error}));
        }
    })
    .catch(error => res.status(500).json({error}));
};

