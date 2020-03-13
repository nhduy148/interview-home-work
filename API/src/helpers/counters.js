const mongoose = require("mongoose");

const countersSchema = new mongoose.Schema({
  forCollection: {
    unique: true,
    type: String,
    required: true
  },
  nextID: {
    type: Number,
    required: true,
    default: 1,
  }
})

const counter = mongoose.model("Counter", countersSchema);

module.exports = {
  Counters: mongoose.model("Counter", countersSchema),
  nextID: async (collection) => {
    const docs = await counter.findOneAndUpdate({forCollection: collection}, { $inc: { nextID: 1 } })
    return docs.nextID;
  },
}
