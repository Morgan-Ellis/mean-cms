const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Page schema
const PageSchema = new Schema({
    title: {
        type: String
    },
    slug: {
        type: String
    },
    content: {
        type: String
    },
    sidebar: {
        type: String
    },
})

module.exports = mongoose.model("Page", PageSchema);
