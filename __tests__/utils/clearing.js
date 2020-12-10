const rimraf = require('rimraf');
const path = require('path');

module.exports = () => {
    let dir = path.resolve(__dirname, '..', '..', 'upload');
    rimraf(path.resolve(__dirname, '..', '..', 'upload'), error => {
        if (error) console.log(error);
    });
};