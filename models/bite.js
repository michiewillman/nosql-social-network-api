const biteSchema = new mongoose.Schema({
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
});

module.exports = biteSchema;