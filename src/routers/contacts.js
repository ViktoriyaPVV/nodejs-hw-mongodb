import express from 'express';
// import { getAllContacts, getContactById } from '../services/contacts.js';
import {
  getContactsController,
  getContactIdController,
  createNewContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactIdController));

router.post('/', jsonParser, ctrlWrapper(createNewContactController));

router.patch('/:contactId', ctrlWrapper(updateContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
