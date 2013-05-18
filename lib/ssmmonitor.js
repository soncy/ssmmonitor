/*
 * Created with Sublime Text (buidl 3031).
 * User: soncy
 * Date: 2013-05-04
 * Time: 11:28:09
 * Contact: http://www.qifendi.com
 */

var https = require('https'),
    http = require('http'),
    nodemailer = require('nodemailer'), // send mail module
    T = require('../tools/tools'),
    log = T.log;


module.exports.log = log;

var emails = T.getEmail().split(',');

function SSMMonitor() {
    this.version = '0.1.1';
}

/**
 * @param {Object}
 * @param config.name {String} will be concat to the from email. eg: Directspace@vpsmonitor.soncy
 * @param config.url: {String} what you want to monitoring page
 * @param config.interval: {Number} frequency of service request by seconds
 * @param config.checkFunc: {Function} the argument is the monitoring page's sourcecode, service will send mail when it return true
 * @param config.mailSubject {String} the subject of mail
*/
SSMMonitor.prototype.start = function(config) {
    this.config = config || {};
    this.init();
    this.monitoring();
};

SSMMonitor.prototype.init = function() {
    this.sender = this.config.name + '@ssmmonitor.soncy';
    if (!emails) {
        log('no emails, monitor will not work');
        process.exit();
    }

    if (T.isTest()) {
        log('send test email!');
        this.sendMail(true);
    }
};

SSMMonitor.prototype.monitoring = function() {
    var self = this;
    this.request(function(data) {
        if (!data){
            log('no content, recheck');
            self.recheck();
            return;
        }
        var checkResult = self.config.checkFunc(data);
        if (checkResult) {
            log(self.config.name, 'is available, send mail now!');
            self.sendMail();
        } else {
            self.recheck();
        }
    });
}

// request monitoring url
SSMMonitor.prototype.request = function(callback) {
    var url = this.config.url,
        protocol = T.getProtocol(url),
        requestModule = protocol === 'https' ? https : http;

    requestModule.get(url, function(res) {
        var content = '';
        res.on('data', function(d) {
            content += d.toString();
        });

        res.on('end', function() {
            callback(content);
        });
    }).on('error', function(e) {
        log(e);
        callback();
    });
}


SSMMonitor.prototype.sendMail = function(isTest) {

    var emailConfig = {
        subject: this.config.mailSubject + (isTest ? '(test mail)' : ''),
        sender: this.sender,
        content: '<a href="' + this.config.url + '">Buy</a>'
    };

    for(var i = 0, len = emails.length; i < len; i++) {
        emailConfig.to = emails[i];
        this.sendPerMail(emailConfig);
    }
};

SSMMonitor.prototype.sendPerMail = function(config) {
    nodemailer.SMTP = {
        host: 'localhost'
    };

    nodemailer.send_mail({
        sender: config.sender,
        to: config.to,
        subject: config.subject,
        html: config.content,
        body: config.content
    }, function(error, success){
        log('send to', config.to, (error ? 'faild，please check sendmail' : 'succeed'));
    });
}

SSMMonitor.prototype.recheck = function() {
    var self = this;

    log(this.config.name, 'is not available, recheck after', this.config.interval, 'seconds.');
    setTimeout(function() {
        self.monitoring();
    }, this.config.interval * 1000);
}


var ssmmonitor = new SSMMonitor();
module.exports = ssmmonitor;

