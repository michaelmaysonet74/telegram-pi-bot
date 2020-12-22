const _commands = require('../commands.js');

const listCommands = () => {
    let success_msg = 'You can use the following commands:\n';
    for (let command in _commands) {
        success_msg += command.replace(/\_/g, ' ') + '\n';
    }
    return Promise.resolve(success_msg);
}

module.exports = listCommands;
