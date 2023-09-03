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
      const user = await User.findOne({ id: req.body.userId });
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
      const user = await User.findOneAndUpdate(req.params.userId);
      res.json(`User ${user} has been updated`);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove(req.params.userId);
      res.json(`User has been deleted`);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
