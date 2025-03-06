import  initMongoConnection  from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
// 5NisVt7vw9Vk@qg