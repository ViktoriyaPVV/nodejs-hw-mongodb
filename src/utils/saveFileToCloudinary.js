// import cloudinary from 'cloudinary';
// import fs from 'node:fs/promises';

// import getEnvVar from '../utils/getEnvVar.js';
// import { CLOUDINARY } from '../constants/index.js';

// cloudinary.v2.config({
//   secure: true,
//   cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
//   api_key: getEnvVar(CLOUDINARY.API_KEY),
//   api_secret: getEnvVar(CLOUDINARY.API_SECRET),
// });

// export const saveFileToCloudinary = async (file) => {
//   const response = await cloudinary.v2.uploader.upload(file.path);
//   await fs.unlink(file.path);
//   return response.secure_url;
// };

import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import getEnvVar from '../utils/getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

// Конфигурация Cloudinary
cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    // Проверка существования файла
    await fs.access(file.path);
    console.log(`Загрузка файла в Cloudinary: ${file.path}`);

    const response = await cloudinary.v2.uploader.upload(file.path);

    // Удаление локального файла после загрузки
    await fs.unlink(file.path);
    console.log(`Файл успешно загружен и удален локально.`);

    return response.secure_url;
  } catch (err) {
    console.error('Ошибка при загрузке файла в Cloudinary:', err.message);
    throw err;
  }
};
