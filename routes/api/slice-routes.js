const router = require("express").Router();

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
router
  .route("/:sliceId/bites")
  .get(getOneSlice)
  .post(createBite)
  .delete(deleteBite);
