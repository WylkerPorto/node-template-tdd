
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let dir = path.resolve(__dirname, '..', '..', 'upload', req.params.siteId);
            if (!fs.existsSync('upload')) fs.mkdirSync('upload');
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(8, (err, hash) => {
                if (err) cb(err);
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb("Invalid file type", false);
        }
    },
};