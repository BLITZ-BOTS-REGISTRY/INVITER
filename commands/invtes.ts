import {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  GuildMember,
  SlashCommandBuilder,
} from "npm:discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("invites")
    .setDescription("Check the invites of a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to check invites for")
        .setRequired(false)
    ),
  action: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const guild = interaction.guild;
    if (!guild) {
      throw new Error("This command can only be used in a server.");
    }

    await interaction.deferReply();
    var member = interaction.guild?.members.cache.get(
      `${interaction.options.get("user")?.value}`,
    )?.user as User || interaction.user;
    var invites = client.inviteManager.getMemberInvites(
      `${interaction.guildId}`,
      member,
    );

    interaction.editReply({
      embeds: [
        new EmbedBuilder().addFields([{
          name: `Account Date`,
          value: `<t:${Math.floor(member.createdTimestamp / 1000)}>`,
          inline: true,
        }, {
          name: `Discord Lookup`,
          value: `[Click Here!](https://discordlookup.com/user/${member.id})`,
          inline: true,
        }]).setThumbnail(member.displayAvatarURL({ forceStatic: true }))
          .setDescription(
            `> **${member} User has \`${invites}\` Invitations.**`,
          ),
      ],
    });
  },
};
