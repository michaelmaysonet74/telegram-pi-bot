const axios = require('axios');

const getPublicIp = () => {
	return axios.get('https://ipinfo.io/json').then((res) => {
		return res.data.ip;
	}).catch((e) => e);
};

module.exports = getPublicIp; 
