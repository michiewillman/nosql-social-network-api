const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

// Friend count of a user generated on-demand
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
