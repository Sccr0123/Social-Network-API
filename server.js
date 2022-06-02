const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Creates / Connects to MongoDB
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/pizza-hunt",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

//Log
mongoose.set("debug", true);

//Enables Routes
app.use(require("./routes"));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
