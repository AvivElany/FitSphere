const mongoose = require("mongoose");
const { paramSchema, imageSchema, likeSchema, creditSchema } = require("./common");

const articlesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    writer: { type: String, required: true },
    params: [paramSchema],
    link: { type: String, required: false },
    likes: [likeSchema],
    section: { type: String, required: true },
    isPremium: { type: Boolean, required: true },
    credit: [creditSchema],
    mainPicture: {imageSchema},
    pictures: [imageSchema],
  },
);

const Articles = mongoose.model("Articles", articlesSchema);

module.exports = Articles;
