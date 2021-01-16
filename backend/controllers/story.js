const Story = require("../models/story");
const StoryType = require("../models/storyType");
const Picture = require("../models/picture");

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
    //liaison entre l'image et l'histoires
    Story.hasOne(Picture);
    Picture.belongsTo(Story, {
        foreignKey : "storyId"
    });
    // récupération de l'histoire
    Story.findOne({where : {id : req.params.id}},{include : {Picture}})
    .then(story => res.status(200).json(story))
    .catch(error => res.status(400).json({error}));
};

//POST NEW
exports.createStory = (req, res, next) => {
    //récupération du type d'histoire correspondant
    StoryType.findOne({where : {name : req.body.storyType}})
    .then(storyType => {
        //liaison entre l'image et l'histoires
        Story.hasOne(Picture);
        Picture.belongsTo(Story, {
            foreignKey : "storyId"
        });
        //création de la nouvelle histoire avec son image
        Story.create({
            userId : req.body.userId,
            typeId : storyType.id,
            title : req.body.title,
            story : req.body.story,
            Picture : {
                url : req.body.url,
                illustrator : req.body.illustrator,
                caption : req.body.caption
            }
        },{
            include : {Picture}
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
        //liaison entre l'image et l'histoires
        Story.hasOne(Picture);
        Picture.belongsTo(Story, {
            foreignKey : "storyId"
        });
        //modification de l'histoire
        Story.update({
            typeId : storyType.id,
            title : req.body.title,
            story : req.body.story,
            Picture : {
                url : req.body.url,
                illustrator : req.body.illustrator,
                caption : req.body.caption
            }
        },{
            include : {Picture}
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