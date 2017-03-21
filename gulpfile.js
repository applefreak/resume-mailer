var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');
var mail = require('gulp-mailing');
var prompt = require('gulp-prompt');
var mustache = require("gulp-mustache");
var rename = require("gulp-rename");
var _ = require('lodash');

var config = require('./config');

var variables = {
	subject: config.defaults.subject,
	to: config.defaults.to,
	skills: config.defaults.skills,
	company: config.defaults.company,
	role: config.defaults.role
}

gulp.task('prompt', function() {
	return gulp.src('.')
	.pipe(prompt.prompt([
	{
		type: 'input',
		name: 'subject',
		message: 'Subject of this Email? (' + variables.subject + ')'
	},
	{
		type: 'input',
		name: 'to',
		message: 'And you\'re sending this resume to? (' + variables.to + ')'
	},
	{
		type: 'input',
		name: 'company',
		message: 'Their company name is _____? (' + variables.company + ')'
	},
	{
		type: 'input',
		name: 'role',
		message: 'You want to fulfill the _____ position? (' + variables.role + ')'
	},
	{
		type: 'checkbox',
        name: 'skills',
        message: 'Select skills you want them to know: (all)',
        choices: variables.skills
	}], function(res) {
		variables = _.assignWith(res, variables, function(objValue, srcValue) {
			return _.isEmpty(objValue) ? srcValue : objValue;
		});
	}));
});

gulp.task('confirm', ['prompt'],function() {
	console.log(variables);
	return gulp.src('.')
	.pipe(prompt.prompt([{
		type: 'confirm',
		name: 'confirmed',
		default: false,
		message: 'Is the above information correct?'
	}], function(res) {
		if (! res.confirmed) {
			process.exit(1);
		}
	}));
});

gulp.task('template', ['confirm'], function() {
	return gulp.src("./letter.html")
	.pipe(mustache(variables))
	.pipe(inlineCss({removeStyleTags: false}))
	.pipe(rename({
		basename: variables.company
	}))
	.pipe(gulp.dest('./build'));
});

gulp.task('mail', ['template'],function () {
	return gulp.src('./build/' + variables.company +'.html')
	.pipe(mail({
		subject: variables.subject,
		to: [variables.to],
		from: config.defaults.from,
		smtp: config.smtpInfo,
		attachments: config.defaults.attachments
	}));
});

