const { Thought, User } = require("../models");

const thoughtController = {
	addThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({
						message: "No User found with this id!",
					});
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},

	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({
						message: "No Thought found with this id!",
					});
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoghtId })
			.then((deletedThought) => {
				if (!deletedThought) {
					return res
						.status(404)
						.json({ message: "No Thought with this id!" });
				}
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $pull: { thoughts: params.thoughtId } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({
						message: "No User found with this id!",
					});
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	removeReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtID },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
