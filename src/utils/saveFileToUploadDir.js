// import path from 'node:path';
// import fs from 'node:fs/promises';
// import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
// import getEnvVar from '../utils/getEnvVar.js';

// export const saveFileToUploadDir = async (file) => {
//   await fs.rename(
//     path.join(TEMP_UPLOAD_DIR, file.filename),
//     path.join(UPLOAD_DIR, file.filename),
//   );

//   return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
// };

import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import getEnvVar from '../utils/getEnvVar.js';

export const saveFileToUploadDir = async (file) => {
  // Убедиться, что TEMP_UPLOAD_DIR и UPLOAD_DIR существуют
  await fs.mkdir(TEMP_UPLOAD_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const sourcePath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const destPath = path.join(UPLOAD_DIR, file.filename);

  await fs.rename(sourcePath, destPath);

  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};
