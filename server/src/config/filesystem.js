import multer from "multer";

const STORAGE = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, "public/img");
    },

    filename: (req, file, callback) => {
        callback(null, req.body.name);
    }
});

const upload = multer({storage: STORAGE});

export default upload;