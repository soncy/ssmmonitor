/*
 * Created with Sublime Text (buidl 3032).
 * User: soncy
 * Date: 2013-05-12
 * Time: 10:51:11
 * Contact: http://www.qifendi.com
 */


var ssmmonitor = require('./lib/ssmmonitor');

var config = {
    name: 'wholesaleinternet', 
    url: 'https://www.wholesaleinternet.net/cart/?id=214',
    interval: 120,
    checkFunc: function(data) {
        return checkAvailable(data);
    },
    mailSubject: '19刀P4有货啦'
};

function checkAvailable(data) {
    return !(~data.indexOf('out of stock'));
}

ssmmonitor.start(config);