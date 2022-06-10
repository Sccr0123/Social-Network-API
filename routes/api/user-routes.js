const router = require("express").Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendid").post(addFriend).delete(deleteFriend);

module.exports = router;
