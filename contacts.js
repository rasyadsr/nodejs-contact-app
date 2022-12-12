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

const simpanContact = (nama, noHP, email) => {
  const contact = { nama, noHP, email };
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file) || [];

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

module.exports = { simpanContact };
