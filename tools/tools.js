/*
 * Created with Sublime Text (buidl 3031).
 * User: soncy
 * Date: 2013-05-04
 * Time: 22:39:26
 * Contact: http://www.qifendi.com
 */
require('date-utils');

var argv = process.argv;

module.exports.isTest = function() {
    // 如果有第三个参数，则判断第三个参数
    var test = argv[3];
    if (test && isTest(test)) {
        return true;
    }
    return false;
};

function isTest(val) {
    return (val === '-t' || val === '--test');
}

// get url protocol
module.exports.getProtocol = function(url) {
    return url.substring(0,url.indexOf(":"));
};

// get email
module.exports.getEmail = function() {
    return argv[2] || '';
};

// 
module.exports.log = function() {
    var r = [];
    for (var i = 0, len = arguments.length; i < len; i++){
        r.push(arguments[i]);
    }
    console.log(Date.today().toFormat('YYYY-MM-DD HH:MI --->'), r.join(' '));
}