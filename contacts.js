import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin, // Apa" yang dikirim
  output: process.stdout, // Apa" yang di tampilkan
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  // cek ketersediaan folder dan buat jika belom ada
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

/**
 * Gunakan function ini untuk meng-generate pertanyaan
 * @param {string} pertanyaan
 * @returns
 */
export const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(`Masukan ${pertanyaan} anda : `, (pertanyaan) =>
      resolve(pertanyaan)
    );
  });
};

export const simpanContact = (nama, noHP, email) => {
  const contact = { nama, noHP, email };
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file) || [];

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log("Terima kasih sudah memasukan data.");

  rl.close(); // agar close dari input terminal nya
};

/**
 * Jangan pake ini, ini contoh aja
 * Pakai yang dynamis aja
 *
    const questionName = () => {
    return new Promise((resolve, reject) => {
        rl.question("Masukn nama anda : ", (nama) => {
        resolve(nama);
        });
    });
    };

    const questionNoHp = () => {
    return new Promise((resolve, reject) => {
        rl.question("Masukan no HP anda : ", (noHP) => {
        resolve(noHP);
        });
    });
    };

*/
