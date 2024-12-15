import { Client, IntentsBitField } from "npm:discord.js";
import InviteManager from "npm:discord-invite";
export default {
  event: "ready",
  once: true,
  action: async (
    client: Client,
  ) => {
    client.inviteManager = new InviteManager(client);
  },
};
