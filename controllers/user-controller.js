const { User, Thought } = require("../models");

const UserController = {
	getAllUsers(req, res) {
		User.find({})
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.select("-__v")
			.sort({ _id: -1 })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},

	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.populate({
				path: "friends",
				select: "-__v",
			})
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},

	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: "No User found with this ID!",
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: "No User found with this ID!",
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: "No User found with this ID!",
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.id },
			{ $push: { friends: params.friendid } },
			{
				new: true,
				runValidators: true,
			}
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: "No User found with this ID!",
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},
	deleteFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.id },
			{ $pull: { friends: params.friendid } },
			{
				new: true,
				runValidators: true,
			}
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: "No User found with this ID!",
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},
};

module.exports = UserController;
