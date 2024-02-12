const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  text: { type: String, required: true },
  status: {
    type: String,
    default: "active",
    enum: ["active", "completed", "deleted"],
  },
  created_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
