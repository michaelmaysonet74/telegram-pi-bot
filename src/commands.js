'use strict';

const commands = {
	on:								/ON\?/i,
	public_ip:				/.*public.*ip.*/gi,
	retropie_off:			/.*retropie.*off.*|.*shut.*down.*retropie.*/gi,
	list_vpn_clients:	/(list)?.*vpn.*clients/gi,
	list_vpn_certs:		/(list)?.*vpn.*certs/gi,
};

module.exports = commands;