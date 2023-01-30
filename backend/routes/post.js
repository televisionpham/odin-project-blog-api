const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.post_get_all);
router.post("/", postController.post_create);
router.delete("/:id", postController.post_delete);
router.put("/:id", postController.post_update);

module.exports = router;
