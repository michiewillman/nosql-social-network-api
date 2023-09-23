const { Schema, Types } = require("mongoose");
const formatDate = require("../utils/formatDate");

const biteSchema = new Schema(
  {
    biteId: {
      type: Schema.Types.ObjectId,
      // set to a new id on default
      default: () => new Types.ObjectId(),
    },
    biteBody: {
      type: String,
      required: true,
      maxLength: [280, "Cannot be more than 280 characters"],
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = biteSchema;
