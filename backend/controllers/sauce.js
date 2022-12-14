const fs = require("fs");

const Sauce = require("../models/Sauce");

exports.getAllSauces = (req, res, next) =>{
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }))
}

exports.getOneSauce = (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
}

exports.createSauce = (req, res, next) =>{
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
  
    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
        .catch((error) => res.status(400).json({ error }))
}

exports.modifySauce = (req, res, next) =>{
    if(req.file){
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) =>{
                if(sauce.userId == req.auth.userId){
                    const filename = sauce.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, (err) =>{
                        if(err) throw err; 
                    })
                }
            })
            .catch((error) => res.status(401).json({ error }))
    }
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { 
        ...req.body 
    };
    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) =>{
            if(sauce.userId != req.auth.userId){
                res.status(403).json({ message : "Demande non autorisée"});
            }else{
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message : "Sauce modifiée!" }))
                    .catch((error) => res.status(401).json({ error }))
            }
        })
        .catch((error) => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if(sauce.userId != req.auth.userId){
                res.status(403).json({message: "Demande non autorisée"});
            }else{
                const filename = sauce.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () =>{
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
                        .catch((error) => res.status(401).json({ error }))
                })
            }
        })
        .catch((error) => res.status(500).json({ error }))
}

exports.likedSauce = (req, res, next) =>{
    switch(req.body.like){
        case 1:
            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
                .then(() => res.status(201).json({ message: "L'utilisateur aime" }))
                .catch((error) => res.status(400).json({ error }))
            break;
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) =>{
                    if(sauce.usersLiked.includes(req.body.userId)){
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                            .then(() => res.status(201).json({ message: "L'utilisateur annule son like" }))
                            .catch((error) => res.status(400).json({ error }))
                    }
                    if(sauce.usersDisliked.includes(req.body.userId)){
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                            .then(() => res.status(201).json({ message: "L'utilisateur annule son dislike" }))
                            .catch((error) => res.status(400).json({ error }))
                    }
                })
                .catch((error) => res.status(404).json({ error }))
            break;
            case -1:
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
                    .then(() => res.status(201).json({ message: "L'utilisateur n'aime pas" }))
                    .catch((error) => res.status(400).json({ error }))
                break;
        default:
            console.log({ error });
    }
}