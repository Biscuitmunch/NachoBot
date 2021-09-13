import Command, * as Types from '../../interfaces/Command';

module.exports = {
    help: () => {message.channel.send("lol idk");},
    execute: ({ client, message }) => {
    
        client.distube.stop(message);
        
        message.channel.send("song stopped")
    },
    name: "stop",
}