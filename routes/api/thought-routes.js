const router = require("express").Router();
const {
	getAllThoughts,
	getThoughtById,
	addThought,
	updateThought,
	addReaction,
	removeThought,
	removeReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(addThought);

router
	.route("/:thoughtId")
	.get(getThoughtById)
	.put(updateThought)
	.delete(removeThought);

router.route("/:thoughtId/reaction/").post(addReaction);

router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);

module.exports = router;
