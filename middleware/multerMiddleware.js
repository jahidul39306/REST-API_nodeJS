const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E5);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.toString() === 'image/jpg' || file.mimetype.toString() === 'image/png' || file.mimetype.toString() === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

exports.multerMiddleware = multer({storage: fileStorage, fileFilter: fileFilter}).single('image');