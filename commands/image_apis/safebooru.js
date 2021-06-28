const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const {
  commands: {
    danbooru: { safe_enabled: enabled, blacklisted_tags: blacklist },
  },
} = require('../../config.json');

function scuffedEncode(str) {
  return str
    .replace(/\s/g, '_')
    .replace('(', '%28')
    .replace(')', '%29')
    .replace('!', '%21')
    .replace(':', '%3A')
    .replace('+', '%2B');
}

module.exports = {
  name: 'san',
  aliases: ['s', 'safebooru'],
  async execute(client, message, args) {
    // enabled check
    if (!enabled) {
      message.reply('This command is disabled.').then((msg) => {
        setTimeout(() => msg.delete(), 1000);
      });
      return;
    }

    if (!message.channel.nsfw) {
      message.react('❌');
      return;
    }

    let tags = '-status%3Adeleted';

    for (let i = 0, len = args.length; i < len; i++) {
      if (blacklist.indexOf(args[i]) == -1) {
        tags += '+' + scuffedEncode(args[i]);
      }
    }

    const outputMessage = await message.channel.send(`Trying to get image...`);

    const url = `https://safebooru.donmai.us/posts.json?tags=${tags}&random=true&filesize=..8M&limit=1`;
    const response = await fetch(url).then((response) => response.json());

    if (
      response === undefined ||
      response?.length == 0 ||
      response[0]?.file_url === undefined
    ) {
      outputMessage.edit(`Failed to get image.\nTags: ||${tags}||`);
      return;
    }

    const image = response[0].file_url;
    const embed = new MessageEmbed().setImage(image);

    message.channel.send(embed);
    outputMessage.edit('Done!');
  },
};
