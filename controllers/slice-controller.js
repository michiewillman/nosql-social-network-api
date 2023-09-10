const { Slice } = require("../models");

module.exports = {
  async getAllSlices(req, res) {
    try {
      const slices = await Slice.find();
      res.json(slices);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getOneSlice(req, res) {
    try {
      const slice = await Slice.findOne({ _id: req.params.sliceId });

      if (!slice) {
        return res.status(400).json("No slice found");
      }

      res.json(slice);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createSlice(req, res) {
    try {
      const newSlice = await Slice.create(req.body);
      res.json(`Slice has been created`);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateSlice(req, res) {
    try {
      const slice = await Slice.findOneAndUpdate(
        { _id: req.params.sliceId },
        { $set: req.body },
        { runValidators: true }
      );

      if (!slice) {
        return res.status(400).json("No slice found");
      }

      res.json(`Slice has been updated.`);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteSlice(req, res) {
    try {
      const slice = await Slice.findOneAndRemove({ _id: req.params.sliceId });

      if (!slice) {
        return res.status(400).json("No slice found");
      }

      res.json(`Slice has been deleted.`);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
