const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const secrets = require("../secrets");

const User = require("../models/user");

//SIGN UP
exports.signup = (req, res, next) => {
    //hashage du mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(passwordHashed => {
        //création du nouvel utilisateur
        User.create({
            pseudo : req.body.pseudo,
            password : passwordHashed
        })
        .then(() => res.status(201).json({message : "Utilisateur créé."}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//LOG IN
exports.login = (req, res, next) => {
    const token = req.body.user.captcha;
    const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secrets.invisibleCaptchaSecretKey}&response=${token}`;

    //si le token n'existe pas ou est vide
    if(token === null || token === undefined || token === ""){
        return res.status(401).json({error : "Token invalide."});
    }
    //si le token existe
    //options de la requête
    const options = {
        method : "POST"
    };
    //vérification du token auprès du service recaptcha de google
    fetch(url, options)
    .then(response => {
        response.json()
        .then(myJson => {
            //si la vérification est un succes
            if(myJson.success === true){
                //recherche de l'utilisateur dans la base de données
                User.findOne({where : {pseudo : req.body.user.pseudo}})
                .then(user => {
                    //si l'utilisateur n'existe pas
                    if(user === null || user.deleted === "true"){
                        return res.status(401).json({error : "Identifiants incorrects."});
                    }
                    //si l'utilisateur existe, on vérifie le mot de passe
                    bcrypt.compare(req.body.user.password, user.password)
                    .then(valid => {
                        //si le mot de passe est incorrect
                        if(!valid){
                            return res.status(401).json({error : "Identifiants incorrects."});
                        }
                        //si le mot de passe est correct
                        res.status(200).json({
                            userId : user.id,
                            token : jwt.sign({userId : user.id}, secrets.salt, {expiresIn : "30 days"}),
                            admin : user.admin
                        });
                    })
                    .catch(error => res.status(500).json({error}));
                })
                .catch(error => res.status(500).json({error}));
            }
            //si la vérification a échouée
            else{
                return res.status(401).json({error : "Token invalide"});
            }
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//GET ALL
exports.getAllUsers = (req, res, next) => {
    //récupération de tous les utilisateurs
    User.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}));
};

//MODIFY PSEUDO
exports.modifyUserPseudo = (req, res, next) => {
    //modification du pseudo de l'utilisateur
    User.update(
        {pseudo : req.body.pseudo},
        {where : {id : req.params.id}}
    )
    .then(() => res.status(200).json({message : "Pseudo modifié."}))
    .catch(error => res.status(400).json({error}));
};

//MODIFY PASSWORD
exports.modifyUserPassword = (req, res, next) => {
    User.findOne({where : {id : req.params.id}})
    .then(user => {
        //vérification de l'ancien mot de passe
        bcrypt.compare(req.body.oldPassword, user.password)
        .then(valid => {
            //si le mot de passe est incorrect
            if(!valid){
                return res.status(401).json({error : "Identifiants incorrects"});
            }
            //si le mot de passe est correct
            //hashage du mot de passe
            bcrypt.hash(req.body.newPassword, 10)
            .then(passwordHashed => {
                //modification du mot de passe de l'utilisateur
                User.update(
                    {password : passwordHashed},
                    {where : {id : req.params.id}}
                )
                .then(() => res.status(200).json({message : "Mot de passe modifié."}))
                .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//DELETE ONE
exports.deleteUser = (req, res, next) => {
    //vérification que l'utilisateur n'est pas l'admin
    User.findOne({where : {id : req.params.id}})
    .then(user => {
        //si l'utilisateur n'est pas l'admin
        if(!user.admin){
            //suppression de l'utilisateur
            User.update({deleted : true},{where : {id : req.params.id}})
            .then(() => res.status(200).json({message : "Utilisateur supprimé."}))
            .catch(error => res.status(400).json({error}));
        }
        //si l'utilisateur est l'admin
        else{
            return res.status(401).json({error : "Personne ne supprime Merlin!"});
        }
    })
    .catch(error => res.status(500).json({error}));
};