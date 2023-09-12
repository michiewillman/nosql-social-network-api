const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// Routes for users

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
