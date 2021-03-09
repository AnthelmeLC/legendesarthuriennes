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
        foreignKey : "storyId"
    });
    // récupération de l'histoire
    Picture.findOne({where : {storyId : req.params.id}, include : Story})
    .then(story => {
        res.status(200).json({
            ...story.dataValues,
            url : `${req.protocol}://${req.get("host")}/images/${story.dataValues.url}`
        })
    })
    .catch(error => res.status(400).json({error}));
};

//GET 4 RANDOM
exports.getFourRandom = (req, res, next) => {
    Story.findAll({attributes : ["id"]})
    .then(ids => {
        let storiesIds = [];
        for(let id of ids){
            storiesIds.push(id.dataValues.id);
        }
        let randomIds = [];
        for(let i=0; i<4; i++){
            const random = Math.floor(Math.random() * storiesIds.length);
            randomIds.push(storiesIds[random]);
            storiesIds.splice(random, 1);
        }
        //liaison entre l'image et l'histoires
        Picture.belongsTo(Story, {
            foreignKey : "storyId"
        });
        Picture.findAll({where : {storyId : randomIds}, include : Story})
        .then(stories => {
            let randomStories = [];
            for(let story of stories){
                randomStories.push({
                    ...story.dataValues,
                    url : `${req.protocol}://${req.get("host")}/images/${story.dataValues.url}`
                });
            }
            res.status(200).json(randomStories);
        })
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(400).json({error}));
}

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
            url : req.file.filename,
            illustrator : storyObject.illustrator,
            caption : storyObject.caption,
            story : {
                title : storyObject.title,
                story : storyObject.story,
                userId : storyObject.userId,
                typeId : storyType.id
            }
        },{
            include : {association : Picture.Story}
        })
        .then(() => res.status(201).json({message : "Histoire créée."}))
        .catch(error => res.status(400).json({error} + "erreur story create."));
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
        //si l'utilisateur change l'image
        if(req.file){
            //récupération de l'ancienne image
            Picture.findOne({where : {id : storyObject.pictureId}})
            .then(picture => {
                //suppression de l'image dans le dossier
                fs.unlink(`images/${picture.url}`, () => {
                    //liaison entre l'image et l'histoires
                    Picture.Story = Picture.belongsTo(Story, {
                        foreignKey : "storyId"
                    });
                    //mise à jour de l'image puis de l'histoire
                    Picture.update({
                        url : req.file.filename,
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
    //recherche de l'image correspondant à l'histoire
    Picture.findOne({where : {storyId : req.params.id}})
    .then(picture => {
        //suppression de l'image
        fs.unlink(`images/${picture.url}`, () => {
            //suppression de l'histoire
            Story.destroy({where : {id : req.params.id}})
            .then(() => res.status(200).json({message : "Histoire supprimée."}))
            .catch(error => res.status(400).json({error}));
        })
    })
    .catch(error => res.status(400).json(error))
};