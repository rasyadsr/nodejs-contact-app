import { constants } from "buffer";
import fs from "fs";

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  // cek ketersediaan folder dan buat jika belom ada
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

export const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

export const findContactByNama = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() == nama.toLowerCase()
  );

  return contact;
};

// Menulis / menimpa file contact.json
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// Menambah data contact baru
export const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

export const checkDuplicate = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

export const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
};

export const updateContact = (contactBaru) => {
  const contacts = loadContact();
  const index = contacts.findIndex(
    (contact) => contact.nama == contactBaru.oldNama
  );

  delete contactBaru.oldNama;
  const updateContact = contactBaru;

  contacts[index] = updateContact;
  saveContacts(contacts);
};
