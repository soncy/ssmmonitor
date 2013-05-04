/*
 * Created with Sublime Text (buidl 3031).
 * User: soncy
 * Date: 2013-05-04
 * Time: 21:00:24
 * Contact: http://www.qifendi.com
 */

var ssmmonitor = require('./lib/ssmmonitor');

var config = {
    name: '123systems', 
    url: 'https://123systems.net/billing/cart.php?a=add&pid=149',
    interval: 120,
    checkFunc: function(data) {
        return checkAvailable(data);
    },
    mailSubject: '123systems有货啦'
};

function checkAvailable(data) {
    return !(~data.indexOf('Out of Stock'));
}

ssmmonitor.start(config);