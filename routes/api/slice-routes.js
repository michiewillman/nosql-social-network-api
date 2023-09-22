const router = require("express").Router();
const {
  getAllSlices,
  getOneSlice,
  createSlice,
  updateSlice,
  deleteSlice,
  createBite,
  deleteBite,
} = require("../../controllers/slice-controller");

// /api/slices
router.route("/").get(getAllSlices).post(createSlice);

// /api/slices/:sliceId
router
  .route("/:sliceId")
  .get(getOneSlice)
  .post(createSlice)
  .put(updateSlice)
  .delete(deleteSlice);

// /api/slices/:sliceId/bites
router.route("/:sliceId/bites").post(createBite);

// /api/slices/:sliceId/bites/:biteId
router.route("/:sliceId/bites/:biteId").delete(deleteBite);

module.exports = router;
