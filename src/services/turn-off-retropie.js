const nodeSSH = require('node-ssh');
const ssh = new nodeSSH();

const turnRetropieOff = () => {
	return new Promise((resolve, reject) => {
		ssh.connect({
			host: process.env.RETROPIE_HOST,
			username: process.env.RETROPIE_USERNAME,
			password: process.env.RETROPIE_PASSWORD,
			port: 22,
		})
		.then(
			() => {
				ssh.execCommand('sudo halt');
				return resolve('The Retropie shut down successfully!');
			}
		);
	});
};

module.exports = turnRetropieOff;