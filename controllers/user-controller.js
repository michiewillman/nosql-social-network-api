const User = require("../models/user");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.userId });

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
        { $set: req.body }
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
      const user = await User.findOneAndRemove(req.params.userId);

      if (!user) {
        return res.status(404).json("No user found with that ID");
      }

      res.json(`User has been deleted`);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
