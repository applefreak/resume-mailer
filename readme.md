
# Resume Mailer

Sending job resumes the programmer's way. Using Gulp and Nodemailer. Automate all the things!

![In Action](https://poyu.xyz/img/resume-mailer/action.gif)

## Install

Have [Gulp](http://gulpjs.com/) installed.

Clone this repository, and install dependecies

	$ git clone https://github.com/applefreak/resume-mailer.git
	$ cd resume-mail
	$ npm install

## Configure

Copy and rename `config.example.js` and `letter.example.html` to `config.js` and `letter.html` respectively. But you should really use [MailChimp](https://mailchimp.com/) to make your own letter! The example letter just serves as an example.

Open `config.js` and edit `smtpInfo` to match your email service, edit `skills` to your own, then finally `defaults` to your own default values.

## Test It Out

You can test out the mail by executing:

	$ gulp template

This will create an HTML file inside the `build` folder, with the company name as the file name.

__This does not mail the letter!__

After checking and making sure the letter is fine, you can mail it by running this Gulp task:

	$ gulp mail

This time, the email will be sent out!

## That's It!

I've written a post on this project, you can check it [here]() on my site.

Thanks for reading!
