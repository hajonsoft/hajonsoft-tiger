var  moment = require('moment');

const stamp = parseInt(moment().format('X')).toString(36);
console.log('%c 🍜 stamp: ', 'font-size:20px;background-color: #FCA650;color:#fff;', stamp);