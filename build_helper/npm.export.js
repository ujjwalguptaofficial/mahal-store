if (process.env.NODE_ENV === 'production') {
    module.exports = require('./mahal-store.commonjs2.min.js');
}
else {
    module.exports = require('./mahal-store.commonjs2.js');
}
