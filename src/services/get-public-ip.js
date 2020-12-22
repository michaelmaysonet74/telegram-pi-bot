const axios = require('axios');

const getPublicIp = () => (
    axios.get('https://ipinfo.io/json')
        .then((res) => res.data.ip)
        .catch((e) => e)
);

module.exports = getPublicIp;
