const mongoose = require("mongoose");

const factsSchema = new mongoose.Schema(
    {
        kind: { type: String, required: true, valid: ["nutrition", "fitness", "motivation"] },
        fact: { type: String, required: true },
    }
);

const Facts = mongoose.model("Facts", factsSchema);

module.exports = Facts;