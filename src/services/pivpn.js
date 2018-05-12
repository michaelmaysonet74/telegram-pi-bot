'use strict';

const exec = require('child_process').exec;

function pivpnPromise(command) {
	return new Promise((resolve, reject) => {
		const dir = exec(command, (err, stdout, stderr) => {
			return resolve(stdout);
		});
	});
}

const listCerts = () => pivpnPromise('pivpn -l');
const listClients = () => pivpnPromise('pivpn -c');

module.exports = {
	listCerts,
	listClients,
};