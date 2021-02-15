const Bibliography = require("../models/bibliography");
const fs = require("fs");

//GET ALL
exports.getAllBibliography = (req, res, next) => {
    //récupération de toutes les bibliographies
    Bibliography.findAll()
    .then(bibliography => {
        let bibliographyList = bibliography;
        for(let bibliography of bibliographyList){
            bibliography.pictureUrl = `${req.protocol}://${req.get("host")}/images/${bibliography.pictureUrl}`
        }
        res.status(200).json(bibliographyList)
    })
    .catch(error => res.status(400).json({error}));
};

//POST NEW
exports.createBibliography = (req, res, next) => {
    //parsing de l'objet bibliography
    const bibliographyObject = JSON.parse(req.body.bibliography);
    //création de la nouvelle bibliographie
    Bibliography.create({
        ...bibliographyObject,
        pictureUrl : req.file.filename
    })
    .then(() => res.status(201).json({message : "Bibliographie créée."}))
    .catch(error => res.status(400).json({error}));
};

//MODIFY ONE
exports.modifyBibliography = (req, res, next) => {
    const bibliographyObject = {
        ...JSON.parse(req.body.bibliography),
    }
    delete bibliographyObject.pictureUrl;
    //si l'utilisateur modifie l'image de la bibliographie
    if(req.file){
        Bibliography.findOne({where : {id : req.params.id}})
        .then(bibliography => {
            //suppression de l'ancienne image
            fs.unlink(`images/${bibliography.pictureUrl}`, () => {
                //nouvelles valeurs de la bibliographie
                Bibliography.update({...bibliographyObject, pictureUrl : req.file.filename}, {where : {id : req.params.id}})
                .then(() => res.status(201).json({message : "Bibliograhie modifiée"}))
                .catch(error => res.status(400).json({error}));
            })
        })
        .catch(error => res.status(400).json({error}));
    }
    //si l'utilisateur ne modifie pas l'image de la bibliographie
    else{
        Bibliography.update({...bibliographyObject}, {where : {id : req.params.id}})
        .then(() => res.status(201).json({message : "Bibliograhie modifiée"}))
        .catch(error => res.status(400).json({error}));
    }
};

//DELETE ONE
exports.deleteBibliography = (req, res, next) => {
    Bibliography.findOne({where : {id : req.params.id}})
    .then(bibliography => {
        fs.unlink(`images/${bibliography.pictureUrl}`, () => {
        //suppression de la bibliographie
        Bibliography.destroy({where : {id : req.params.id}})
        .then(() => res.status(200).json({message : "Bibliographie supprimée."}))
        .catch(error => res.status(400).json({error}));
        })
    })
    .catch(error => res.status(400).json({error}));
};