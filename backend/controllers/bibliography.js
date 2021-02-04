const Bibliography = require("../models/bibliography");
const fs = require("fs");

//GET ALL
exports.getAllBibliography = (req, res, next) => {
    //récupération de toutes les bibliographies
    Bibliography.findAll()
    .then(bibliography => res.status(200).json(bibliography))
    .catch(error => res.status(400).json({error}));
};

//POST NEW
exports.createBibliography = (req, res, next) => {
    //parsing de l'objet bibliography
    const bibliographyObject = JSON.parse(req.body.bibliography);
    //création de la nouvelle bibliographie
    Bibliography.create({
        ...bibliographyObject,
        pictureUrl : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    })
    .then(() => res.status(201).json({message : "Bibliographie créée."}))
    .catch(error => res.status(400).json({error}));
};

//MODIFY ONE
exports.modifyBibliography = (req, res, next) => {
    //si l'utilisateur modifie l'image de la bibliographie
    if(req.file){
        Bibliography.findOne({where : {id : req.params.id}})
        .then(bibliography => {
            //suppression de l'ancienne image
            const filename = bibliography.pictureUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                //nouvelles valeurs de la bibliographie
                const bibliographyObject = {
                    ...JSON.parse(req.body.bibliography),
                    pictureUrl : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                }
                Bibliography.update({...bibliographyObject}, {where : {id : req.params.id}})
                .then(() => res.status(201).json({message : "Bibliograhie modifiée"}))
                .catch(error => res.status(400).json({error}));
            })
        })
        .catch(error => res.status(400).json({error}));
    }
    //si l'utilisateur ne modifie pas l'image de la bibliographie
    else{
        const bibliographyObject = {
            ...JSON.parse(req.body.bibliography),
        }
        Bibliography.update({...bibliographyObject}, {where : {id : req.params.id}})
        .then(() => res.status(201).json({message : "Bibliograhie modifiée"}))
        .catch(error => res.status(400).json({error}));
    }
};

//DELETE ONE
exports.deleteBibliography = (req, res, next) => {
    Bibliography.findOne({where : {id : req.params.id}})
    .then(bibliography => {
        const filename = bibliography.pictureUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
        //suppression de la bibliographie
        Bibliography.destroy({where : {id : req.params.id}})
        .then(() => res.status(200).json({message : "Bibliographie supprimée."}))
        .catch(error => res.status(400).json({error}));
        })
    })
    .catch(error => res.split(400).json({error}));
};