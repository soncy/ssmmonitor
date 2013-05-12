/*
 * Created with Sublime Text (buidl 3032).
 * User: soncy
 * Date: 2013-05-12
 * Time: 22:10:14
 * Contact: http://www.qifendi.com
 */


var ssmmonitor = require('./lib/ssmmonitor');

var config = {
    name: 'bandwagonhost', 
    url: 'https://bandwagonhost.com/cart.php?a=add&pid=5',
    interval: 120,
    checkFunc: function(data) {
        return checkAvailable(data);
    },
    mailSubject: '9.9刀有货啦'
};

function checkAvailable(data) {
    return !(~data.indexOf('Out of Stock'));
}

ssmmonitor.start(config);