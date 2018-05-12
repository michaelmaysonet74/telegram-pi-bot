'use strict';

function listCommands(commands) {
	let success_msg = 'You can use the following commands:\n';
	return new Promise((resolve, reject) => {
		for (command in commands) {
			success_msg += command.replace(/\_/g, ' ') + '\n';
		}

		return resolve(success_msg);
	});
}

module.exports = listCommands;