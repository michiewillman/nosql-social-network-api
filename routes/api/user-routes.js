const router = require("express").Router();

// Routes for users

// /api/users
// GET
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId

// GET

// POST

// PUT

// DELETE
