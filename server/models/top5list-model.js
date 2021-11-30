const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        ownerEmail: {type: String, required: false},
        name: { type: String, required: true },
        items: { type: [String], required: true },
        views: { type: Number, required: true},
        likes: { type: Number, required: true},
        dislikes: {type: Number, required: true},
        datePublished: {type: Date, required: false},
        comments: {type: [Object], required: true},
        emailLikes: {type: [String], required: false},
        emailDislikes: {type: [String], required: false},
        isCommunityList: {type: Boolean, required: true},
        communityItems: {type: [Object], required: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
