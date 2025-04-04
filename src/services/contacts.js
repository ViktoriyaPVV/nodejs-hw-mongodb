import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  const [contactCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (body) => {
  const newContact = await ContactsCollection.create(body);
  return newContact;
};

export const updateContact = async (
  contactId,
  payload,
  // options = {},
  userId,
) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      // includeResultMetadata: true,
    },
  );
  console.log('contactId:', contactId);
  console.log('userId:', userId);
  console.log('payload:', payload);

  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};
