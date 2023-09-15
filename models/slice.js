const { Schema, model } = require("mongoose");
const biteSchema = require("./bite");
const formatDate = require("../utils/formatDate");

const sliceSchema = new Schema(
  {
    sliceText: {
      type: String,
      required: true,
      minLength: [1, "Text required"],
      maxLength: [280, "Cannot be more than 280 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    bites: [biteSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

sliceSchema.virtual("biteCount").get(function () {
  return `This slice has ${this.bites.length} bites.`;
});

// Initialize the User model
const Slice = model("Slice", sliceSchema);

module.exports = Slice;
