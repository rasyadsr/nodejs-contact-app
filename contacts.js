const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  // cek ketersediaan folder dan buat jika belom ada
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, noHP, email) => {
  const contact = { nama, noHP, email };

  /**
   *   Dipindahkan, agar tidak berulang
   *   konsep single responsibility principal
   *   const file = fs.readFileSync("data/contacts.json", "utf-8");
   *   const contacts = JSON.parse(file) || [];
   */

  const contacts = loadContact();

  // Check Duplicate
  const checkDuplicate = contacts.find((contact) => contact.nama === nama);
  if (checkDuplicate) {
    console.log(
      chalk.red.inverse.bold("Kontak sudah terdaftar, gunakan nama lain !")
    );
    return false;
  }

  // Check Valid Email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  if (noHP) {
    if (!validator.isMobilePhone(noHP, "id-ID")) {
      console.log(chalk.red.inverse.bold("Nomor HP tidak valid!"));
      return false;
    }
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("Terima kasih sudah memasukan data."));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("Daftar Kontak : "));
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() == nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(nama + " tidak ditemukan!"));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHP);
  console.log(contact.email ?? "");
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  /**
   * Kenapa ga bisa pake cara ini ya ?
   *  
   * const index = contacts.findIndex(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
      );

      if (index == -1) {
        console.log(chalk.red.inverse.bold(nama + " tidak ditemukan"));
        return false;
      }

      contacts.splice(index, 1);
   */

  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== contact.nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(nama + " tidak ditemukan"));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(chalk.green.inverse.bold("Berhasil menghapus data."));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
