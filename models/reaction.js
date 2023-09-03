const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    // set to a new id on default
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
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
});

module.exports = reactionSchema;
