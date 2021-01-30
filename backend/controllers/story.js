const Story = require("../models/story");
const StoryType = require("../models/storyType");
const Picture = require("../models/picture");
const fs = require("fs");

//GET ALL TITLES
exports.getAllTitles = (req, res, next) => {
    //liaison entre les histoires et les types d'histoires
    Story.belongsTo(StoryType, {
        foreignKey : "typeId"
    });
    //récupération de tous les titres avec les id d'histoires et de leur type
    Story.findAll({include : StoryType, attributes : ["title", "id", "typeId"]})
    .then(titles => res.status(200).json(titles))
    .catch(error => res.status(400).json({error}));
};

//GET ONE
exports.getOneStory = (req, res, next) => {
    //liaison entre l'image et l'histoires
    Picture.belongsTo(Story, {
        foreignKey : "StoryId"
    });
    // récupération de l'histoire
    Picture.findOne({where : {storyId : req.params.id}, include : Story})
    .then(story => res.status(200).json(story))
    .catch(error => res.status(400).json({error}));
};

//POST NEW
exports.createStory = (req, res, next) => {
    //parsing de l'objet story
    const storyObject = JSON.parse(req.body.story);
    //récupération du type d'histoire correspondant
    StoryType.findOne({where : {name : storyObject.storyType}})
    .then(storyType => {
        //liaison entre l'image et l'histoires
        Picture.Story = Picture.belongsTo(Story, {
            foreignKey : "storyId"
        });
        //création de la nouvelle histoire avec son image
        Picture.create({
            url : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            illustrator : storyObject.illustrator,
            caption : storyObject.caption,
            Story : {
                title : storyObject.title,
                story : storyObject.story,
                userId : storyObject.userId,
                typeId : storyType.id
            }
        },{
            include : {association : Picture.Story}
        })
        .then(() => res.status(201).json({message : "Histoire créée."}))
        .catch(error => res.status(400).json({error} + "erreur sroty create."));
    })
    .catch(error => res.status(400).json({error} + "erreur storyType findOne."));
};

//MODIFY ONE
exports.modifyStory = (req, res, next) => {
    //parsing de l'objet story
    const storyObject = JSON.parse(req.body.story);
    //récupération du type d'histoire correspondant
    StoryType.findOne({where : {name : storyObject.storyType}})
    .then(storyType => {
        if(req.file){
            Picture.findOne({where : {id : storyObject.pictureId}})
            .then(picture => {
                const filename = picture.url.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    //liaison entre l'image et l'histoires
                    Picture.Story = Picture.belongsTo(Story, {
                        foreignKey : "storyId"
                    });
                    Picture.update({
                        url : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                        illustrator : storyObject.illustrator,
                        caption : storyObject.caption,
                    },{
                        where : {id : storyObject.pictureId},
                    })
                    .then(() => {
                        Story.update({
                            title : storyObject.title,
                            story : storyObject.story,
                            typeId : storyType.id
                        },{
                            where : {id : req.params.id}
                        })
                        .then(() => res.status(201).json({message : "Histoire modifiée"}))
                        .catch(error => res.status(400).json({error}))
                    })
                    .catch(error => res.status(400).json({error}));
                })
            })
            .catch(error => res.status(400).json(error))
        }
        else{
            Picture.update({
                illustrator : storyObject.illustrator,
                caption : storyObject.caption,
            
            },{
                where : {id : storyObject.pictureId}
            })
            .then(() => {
                Story.update({
                    title : storyObject.title,
                    story : storyObject.story,
                    typeId : storyType.id
                },{
                    where : {id : req.params.id}
                })
                .then(() => res.status(201).json({message : "Histoire modifiée"}))
                .catch(error => res.status(400).json({error}))
            })
            .catch(error => res.status(400).json({error}));
        }
    })
    .catch(error => res.status(400).json({error}));
};

//DELETE ONE
exports.deleteStory = (req, res, next) => {
    //suppression de l'histoire
    Story.destroy({where : {id : req.params.id}})
    .then(() => res.status(200).json({message : "Histoire supprimée."}))
    .catch(error => res.status(400).json({error}));
};