const listCommands = () => {
    return require('../commands.js').reduce(
        (acc, c) => acc += `${c.replace(/\_/g, ' ')}\n`,
        'You can use the following commands:\n'
    );
};

module.exports = listCommands;
