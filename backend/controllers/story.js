const Story = require("../models/story");
const StoryType = require("../models/storyType");

//GET ALL TITLES
exports.getAllTitles = (req, res, next) => {
    //liaison entre les histoires et les types d'histoires
    StoryType.hasOne(Story);
    Story.belongsTo(StoryType, {
        foreignKey : "typeId"
    });
    //récupération de tous les titres avec les id d'histoires et de leur type
    Story.findAll({attributes : ["title", "id", "typeId"]}, {include : StoryType})
    .then(titles => res.status(200).json(titles))
    .catch(error => res.status(400).json({error}));
};

//GET ONE
exports.getOneStory = (req, res, next) => {
    // récupération de l'histoire
    Story.findOne({where : {id : req.params.id}})
    .then(story => res.status(200).json(story))
    .catch(error => res.status(400).json({error}));
};

//POST NEW
exports.createStory = (req, res, next) => {
    //récupération du type d'histoire correspondant
    StoryType.findOne({where : {name : req.body.storyType}})
    .then(storyType => {
        //création de la nouvelle histoire
        Story.create({
            userId : req.body.userId,
            typeId : storyType.id,
            title : req.body.title,
            story : req.body.story
        })
        .then(() => res.status(201).json({message : "Histoire créée."}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(400).json({error}));
};

//MODIFY ONE
exports.modifyStory = (req, res, next) => {
    //récupération du type d'histoire correspondant
    StoryType.findOne({where : {name : req.body.storyType}})
    .then(storyType => {
        //modification de l'histoire
        Story.update({
            typeId : storyType.id,
            title : req.body.title,
            story : req.body.story
        },
        {
            where : {id : req.params.id}
        })
        .then(() => res.status(201).json({message : "Histoire modifiée."}))
        .catch(error => res.status(400).json({error}));
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