import Command, * as Types from '../../interfaces/Command';

module.exports = {
    help: () => {message.channel.send("lol idk");},
    execute: ({ client, message, args }) => {

        client.distube.setRepeatMode(message, parseInt(args));
        
        message.channel.send("loop moment")
    },
    name: "loop",
}