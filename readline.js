import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin, // Apa" yang dikirim
  output: process.stdout, // Apa" yang di tampilkan
});

rl.question("Masukn nama anda : ", (nama) => {
  rl.question("Masukan no HP anda : ", (noHP) => {
    const contact = { nama, noHP };
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file) || [];

    contacts.push(contact);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

    console.log("Terima kasih sudah memasukan data.");

    rl.close(); // agar close dari input terminal nya
  });
});
