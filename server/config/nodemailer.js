var config = require('./config');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = nodemailer.createTransport(sgTransport(config.mail));
