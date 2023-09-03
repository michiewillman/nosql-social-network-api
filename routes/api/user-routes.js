const router = require("express").Router();

// Routes for users

// /api/users
// GET
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
