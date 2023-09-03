const thought = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [{ type: Schema.Types.ObjectId, ref: "reaction" }],
});
