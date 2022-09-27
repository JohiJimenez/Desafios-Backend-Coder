import multer from 'multer';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../public/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const middlewareImage= upload.single('avatar');

export {middlewareImage}