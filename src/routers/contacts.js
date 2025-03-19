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
import { validationBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contact.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactIdController));

router.post(
  '/',
  jsonParser,
  validationBody(createContactSchema),
  ctrlWrapper(createNewContactController),
);

router.patch('/:contactId', isValidId, ctrlWrapper(updateContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
