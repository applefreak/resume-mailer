
module.exports.smtpInfo = {
	auth: {
		user: 'user@example.com',
		pass: 'example_password'
	},
	host: 'smtp.example.com',
	secureConnection: true,
	port: 465
};

module.exports.skills = [
	'Skill A',
	'Skill B',
	'Skill C'
];

module.exports.defaults = {
	subject: 'Example Resume',
	to: 'user@example.com',
	from: 'Example User <user@example.com>',
	skills: this.skills,
	company: 'Example Company',
	role: 'Example Engineer'
}
