import { simpanContact, tulisPertanyaan } from "./contacts.js";

const main = async () => {
  /**
   * ini yang ga dynamic
   * const nama = await questionName();
   */

  /**
   * Ini pertanyaan yang menggunakan fungsi yang dynamic
   */
  const nama = await tulisPertanyaan("Nama");
  const noHP = await tulisPertanyaan("no Hp");
  const email = await tulisPertanyaan("email");

  simpanContact(nama, noHP, email);
};

main();

// rl.question("Masukn nama anda : ", (nama) => {
//   rl.question("Masukan no HP anda : ", (noHP) => {
//     const contact = { nama, noHP };
//     const file = fs.readFileSync("data/contacts.json", "utf-8");
//     const contacts = JSON.parse(file) || [];

//     contacts.push(contact);

//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

//     console.log("Terima kasih sudah memasukan data.");

//     rl.close(); // agar close dari input terminal nya
//   });
// });
