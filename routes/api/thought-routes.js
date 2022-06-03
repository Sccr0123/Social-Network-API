const router = require("express").Router();
const {
	addThought,
	addReaction,
	removeThought,
	removeReaction,
} = require("../../controllers/thought-controller");

router.route("/:userId").post(addThought);

router.route("/userId/:toughtId").put(addReaction).delete(removeThought);

router.route("/userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
