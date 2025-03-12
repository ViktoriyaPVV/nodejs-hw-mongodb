import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (body) => {
  const newContact = await ContactsCollection.create(body);
  return newContact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const { value } = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  // if (!rawResult || !rawResult.value) return null;

  // return {
  //   contact: rawResult.value,
  //   isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  // };
  return value;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
