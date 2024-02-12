const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  status: {
    type: String,
    default: "inprogress",
    enum: ["inprogress", "completed", "deleted"],
  },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
