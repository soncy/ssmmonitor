/*
 * Created with Sublime Text (buidl 3031).
 * User: soncy
 * Date: 2013-05-04
 * Time: 18:16:14
 * Contact: http://www.qifendi.com
 */

var ssmmonitor = require('./lib/ssmmonitor');

var config = {
    name: 'Buyvm', 
    url: 'https://my.frantech.ca/cart.php?a=add&pid=67',
    interval: 60,
    checkFunc: function(data) {
        return checkAvailable(data);
    },
    mailSubject: 'Buyvm有货啦'
};

function checkAvailable(data) {
    return !(~data.indexOf('Out of Stock'));
}

ssmmonitor.start(config);