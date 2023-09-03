const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
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
    reactions: [{ type: Schema.Types.ObjectId, ref: "reaction" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return `This thought has ${this.reactions.length} reactions.`;
});
