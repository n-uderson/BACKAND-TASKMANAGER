const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const taskController = require("../controllers/taskController");

router.get("/tasks", authMiddleware, taskController.list);
router.post("/tasks", authMiddleware, taskController.create);
router.put("/tasks/:id", authMiddleware, taskController.update);
router.delete("/tasks/:id", authMiddleware, taskController.remove);

module.exports = router;
