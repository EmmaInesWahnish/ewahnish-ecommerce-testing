import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/public/images')
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
export const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Tipo de archivo no soportado'), false);
    }
}

export const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}) 

export const uploader = multer({storage})
