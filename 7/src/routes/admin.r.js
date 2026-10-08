const express = require("express");
const { getAllUsersWithTodos, createUser, updateUser, deleteUser } = require("../service/admin.s");
const { auth } = require("../middleware/auth.m");
const { isAdmin } = require("../middleware/auth.m");
const router = express.Router();

router.get("/getUsers", auth, isAdmin, getAllUsersWithTodos);
router.post("/createUser", auth, isAdmin, createUser);
router.put("/updateUser/:id", auth, isAdmin, updateUser);
router.delete("/deleteUser/:id", auth, isAdmin, deleteUser);

module.exports = router;