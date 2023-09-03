const { Schema, model } = require('mongoose');

const sliceSchema = new mongoose.Schema(
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
    },
    username: {
      type: String,
      required: true,
    },
    bites: [{ type: Schema.Types.ObjectId, ref: "bite" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

sliceSchema.virtual("biteCount").get(function () {
  return `This slice has ${this.bites.length} bites.`;
});

// Initialize the User model
const Slice = model("slice", sliceSchema);

module.exports = Slice;
