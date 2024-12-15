import { Client, GuildMember, Invite, TextChannel, User } from "npm:discord.js";

export default {
  event: "memberLeave",
  once: true,
  action: async (
    client: Client,
    config: { welcome: string },
    member: GuildMember,
    inviter: User,
    invite: Invite,
  ) => {
    var log = client.channels.cache.get(config.welcome) as TextChannel;
    if (!log || log == undefined) {
      return console.error("An Error Occurred in Invite Log Channel.");
    }
    if (!inviter) {
      log.send(
        `> **${member.user.username} Lefted the server, but I couldn't find out who was invited.**`,
        member,
        log,
      );
    } else if (member.id == inviter.id) {
      log.send(
        `> **${member.user.username} Lefted the server by his own invitation! (\` Uses: ${invite.uses} \`)**`,
        member,
        log,
      );
    } else if (member.guild.vanityURLCode == inviter.id) {
      log.send(
        `> **${member.user.username} Lefted Server Using Vanity URL! (\` Uses: ${
          member.guild.fetchVanityData().then((x) => x.uses)
        } \`)**`,
        member,
        log,
      );
    } else {
      client.inviteManager.inviteAdd(member.guild.id, inviter, 1);
      log.send(
        `> **${member.user.tag} Lefted the server! inviter; ${inviter.username} (\` Uses: ${invite.uses} \`)**`,
        member,
        log,
      );
    }
  },
};
