const asyncHandler = require("express-async-handler");
const { bot } = require('../bot.js');

const checkUserInServer = asyncHandler(async (req, res) => {
    const { guildId, username } = req.query;

    if (!guildId || !username) {
        res.status(400);
        throw new Error("Guild Id (Server Id) and username should be provided");
    }

    const parsedGuild = await bot.guilds.fetch(guildId);

    if (!parsedGuild) {
        res.status(400);
        throw new Error("Bot is not a member of the provided guild");
    }

    const members = await parsedGuild.members.fetch();
    const parsedMember = members.find(member => member.displayName.toLowerCase() == username.toLowerCase());

    if (!parsedMember) {
        res.json({
            success: true,
            result: false,
        });
    } else {
        res.json({
            success: true,
            result: true,
        });
    }
});

module.exports = { checkUserInServer };