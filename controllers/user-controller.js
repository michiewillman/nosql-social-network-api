const { User } = require("../models");

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
      // .populate("slices")
      // .populate("friends");

      if (!user) {
        return res.status(404).json("No user found with that ID");
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true }
      );

      if (!user) {
        return res.status(404).json("No user found with that ID");
      }

      res.json(`User ${user} has been updated`);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json("No user found with that ID");
      }

      res.json(`User has been deleted`);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Add friend to user "friends" array property
  async addFriend(req, res) {
    try {
      const user = User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json("No user found with that ID");
      }

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Remove friend from user "friends" array property
  async removeFriend(req, res) {
    try {
      const user = User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json("No user found with that ID");
      }

      res.json(`User has been removed from friends list.`);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
