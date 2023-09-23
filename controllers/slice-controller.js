const { Slice } = require("../models");

const sliceController = {
  async getAllSlices(req, res) {
    try {
      const slices = await Slice.find().sort({ createdAt: -1 });
      res.json(slices);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getOneSlice(req, res) {
    try {
      const slice = await Slice.findOne({ _id: req.params.sliceId });

      if (!slice) {
        return res.status(400).json("No slice found with that id");
      }

      res.json(slice);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createSlice(req, res) {
    try {
      const newSlice = await Slice.create(req.body);
      const userUpdate = await User.findOneAndUpdate(
        { _id: req.body.username },
        { $push: { slices: newSlice._id } },
        { new: true }
      );

      if (!userUpdate) {
        return res.status(404).json({ message: "No user found with this id" });
      }

      res.json(newSlice);
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
        return res.status(400).json("No slice found with that id");
      }

      res.json(slice);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteSlice(req, res) {
    try {
      const slice = await Slice.findOneAndRemove({ _id: req.params.sliceId });

      if (!slice) {
        return res.status(400).json("No slice found with that id");
      }

      const userUpdate = await User.findOneAndUpdate(
        { slices: req.params.sliceId },
        { $pull: { slices: req.params.sliceId } },
        { new: true }
      );

      if (!userUpdate) {
        return res.status(404).json({ message: "No user found with this id" });
      }

      res.json(`Slice has been deleted.`);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Add/Create reaction(bite) to a slice
  async createBite(req, res) {
    try {
      const slice = await Slice.findOneAndUpdate(
        { _id: req.params.sliceId },
        { $addToSet: { bites: req.body } },
        { runValidators: true, new: true }
      );

      if (!slice) {
        return res.status(400).json("No slice found with that id");
      }

      res.json(slice);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Delete a bite from a slice
  async deleteBite(req, res) {
    try {
      const slice = await Slice.findOneAndUpdate(
        { _id: req.params.sliceId },
        { $pull: { bites: { biteId: req.params.biteId } } },
        { runValidators: true, new: true }
      );

      if (!slice) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(slice);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = sliceController;
