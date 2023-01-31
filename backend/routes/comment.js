var express = require("express");
var router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/:postid", commentController.comment_get_by_post);
router.post("/:postid", commentController.comment_create);
router.delete("/:id", commentController.comment_delete);

module.exports = router;
