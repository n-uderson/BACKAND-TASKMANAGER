const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/tasks", taskController.list);
router.post("/tasks", taskController.create);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.remove);

module.exports = router;
