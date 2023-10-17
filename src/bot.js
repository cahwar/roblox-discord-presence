const discord = require("discord.js");

const client = new discord.Client({
    intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async msg => {
    const splittedMessage = msg.content.split(" ");

    if (splittedMessage[0] == "!here") {
        const guild = msg.guild;

        const members = await guild.members.fetch();
        const parsedMember = members.find(member => splittedMessage[1].toLowerCase() == member.displayName.toLowerCase());

        if (parsedMember) {
            msg.reply(`Member ${splittedMessage[1]} exists in the channel ✅`);
        } else {
            msg.reply(`Member ${splittedMessage[1]} does not exist in the channel ❌\nMake sure that your display name`);
        }
    }
});


module.exports = {
    connectBot: () => client.login(process.env.BOT_TOKEN),
    bot: client,
};