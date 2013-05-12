/*
 * Created with Sublime Text (buidl 3032).
 * User: soncy
 * Date: 2013-05-12
 * Time: 10:52:37
 * Contact: http://www.qifendi.com
 */

var ssmmonitor = require('./lib/ssmmonitor');

var config = {
    name: 'wholesaleinternet', 
    url: 'https://www.wholesaleinternet.net/cart/?id=215',
    interval: 120,
    checkFunc: function(data) {
        return checkAvailable(data);
    },
    mailSubject: '19刀atom有货啦'
};

function checkAvailable(data) {
    return !(~data.indexOf('out of stock'));
}

ssmmonitor.start(config);