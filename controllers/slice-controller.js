const { Slice } = require("../models");

const sliceController = {
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

  // Add/Create reaction(bite) to a slice
  async createBite(req, res) {
    try {
      const bite = Slice.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(dbThoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Delete a bite from a slice
  async deleteBite(req, res) {
    try {
      const bite = Slice.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(dbThoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = sliceController;
