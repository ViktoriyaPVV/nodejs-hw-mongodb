// import multer from 'multer';
// import { TEMP_UPLOAD_DIR } from '../constants/index.js';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, TEMP_UPLOAD_DIR);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, `${uniqueSuffix}_${file.originalname}`);
//   },
// });

// export const upload = multer({ storage });

import multer from 'multer';
// import path from 'node:path';
import fs from 'node:fs';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

// Создание папки, если не существует
if (!fs.existsSync(TEMP_UPLOAD_DIR)) {
  fs.mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
