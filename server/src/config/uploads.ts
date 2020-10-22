import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      crypto.randomBytes(10, (err, res) => {
        if (err) return cb(err, null);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
