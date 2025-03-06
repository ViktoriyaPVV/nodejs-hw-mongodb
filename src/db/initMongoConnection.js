// import mongoose from "mongoose";

// const DB = "mongodb+srv://contacts1:5NisVt7vw9Vk@qg@contacts.9ol77.mongodb.net/?retryWrites=true&w=majority&appName=Contacts";
// // "mongodb+srv://contacts1:<db_password>@contacts.9ol77.mongodb.net/?retryWrites=true&w=majority&appName=Contacts"

// export function initMongoConnection() {
//   return mongoose.connect(DB);
// }
import mongoose from 'mongoose';
import getEnvVar from '../utils/getEnvVar.js';

const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};

export default initMongoConnection;