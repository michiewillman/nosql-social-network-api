const userSchema = new mongoose.Schema(
  {
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
      match: [/.+@.+\..+/, "Must be a valid email address"],
    },
    slices: [{ type: Schema.Types.ObjectId, ref: "slice" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Friend count of a user generated on-demand
userSchema.virtual("friendCount").get(function () {
  return `This user has ${this.friends.length} friends.`;
});

// Initialize the User model
const User = model("user", userSchema);

module.exports = User;
