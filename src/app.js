const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const { connectBot } = require("./bot.js");
const discordRoutes = require("./routes/discordRoutes.js");

dotenv.config();
connectBot();

const app = express();

app.use(cors());
app.use(rateLimit({
    windowMs: 5000,
    max: 1,
}));

app.use("/discord", discordRoutes);
app.use((error, req, res, next) => {
    res.json({
        success: false,
        errorMessage: error.message,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});