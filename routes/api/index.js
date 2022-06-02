const router = require("express").router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

router.use("/user", userRoutes);
//router.use("/thoughts", thoughtRoutes);

module.exports = router;
