import Command, * as Types from '../../interfaces/Command';

module.exports = {
    help: () => {message.channel.send("lol idk");},
    execute: ({ client, message, args }) => {

        const song = args.join(" ");
    
        client.distube.play(message, song);
        
        message.channel.send("playing song ")
    },
    name: "play",
    aliases: ["p"]
}