const Bibliography = require("../models/bibliography");

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
    console.log(bibliographyObject);
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
    //modification de la bibliographie
    Bibliography.update({
        title : req.body.title,
        auther : req.body.auther,
        translater : req.body.translater,
        yearOfPublication : req.body.yearOfPublication,
        yearOfReissue : req.body.yearOfReissue,
        pictureUrl : req.body.pictureUrl
    },{
        where : {id : req.params.id}
    })
    .then(() => res.status(201).json({message : "Bibliographie modifiée."}))
    .catch(error => res.status(400).json({error}));
};

//DELETE ONE
exports.deleteBibliography = (req, res, next) => {
    //suppression de la bibliographie
    Bibliography.destroy({where : {id : req.params.id}})
    .then(() => res.status(200).json({message : "Bibliographie supprimée."}))
    .catch(error => res.status(400).json({error}));
};