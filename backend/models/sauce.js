const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, requires: true },
    mainPepper: { type: String, requires: true },
    imageUrl: { type: String, requires: true },
    heat: { type: Number, requires: true },
    likes: { type: String, requires: true },
    dislikes: { type: String, requires: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], rquired: true }
})

module.exports = mongoose.model("Sauce", sauceSchema);