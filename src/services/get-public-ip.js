const axios = require('axios');

const getPublicIp = async () =>
    await axios.get('https://ipinfo.io/json')?.data?.id;

module.exports = getPublicIp;
