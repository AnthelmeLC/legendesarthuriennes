const StoryType = require("../models/storyType");

//GET ALL
exports.getAllStoryTypes = (req, res, next) => {
    //récupération de tous les types d'histoires
    StoryType.findAll()
    .then(storyTypes => res.status(200).json(storyTypes))
    .catch(error => res.status(400).json({error}));
};

//POST NEW
exports.createStoryType = (req, res, next) => {
    //ajout du nouveau type d'histoires
    StoryType.create({
        name : req.body.name
    })
    .then(() => res.status(201).json({message : "Type d'histoires créé."}))
    .catch(error => res.status(400).json({error}));
}

//MODIFY ONE
exports.modifyStoryType = (req, res, next) => {
    //modification du nom du type d'histoires
    StoryType.update({name : req.body.name}, {
        where : {id : req.params.id}
    })
    .then(() => res.status(200).json({message : "Type d'histoires modifié."}))
    .catch(error => res.status(400).json({error}));
};

//DELETE ONE
exports.deleteStoryType = (req, res, next) => {
    //suppresion du type d'histoires
    StoryType.destroy({where : {id : req.params.id}})
    .then(() => res.status(200).json({message : "Type d'histoires supprimé."}))
    .catch(error => res.status(400).json({error}));
};