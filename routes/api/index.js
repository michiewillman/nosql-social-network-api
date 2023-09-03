const router = require("express").Router();
const userRoutes = require("./user-routes");
const sliceRoutes = require("./slice-routes");

router.use("/slices", sliceRoutes);
router.use("/users", userRoutes);

module.exports = router;
