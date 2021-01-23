const nodeSSH = require('node-ssh');
const ssh = new nodeSSH();

const turnRetropieOff = async () => {
    await ssh.connect({
        host: process.env.RETROPIE_HOST,
        username: process.env.RETROPIE_USERNAME,
        password: process.env.RETROPIE_PASSWORD,
        port: 22,
    });
    ssh.execCommand('sudo halt');
    return 'The Retropie shut down successfully!';
};

module.exports = turnRetropieOff;
