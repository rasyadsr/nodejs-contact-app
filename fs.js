import fs from "fs";

/**
 * Menulis file synchronous
 */
try {
  fs.writeFileSync("test.txt", "Hello World secara sycnchronous");
} catch (error) {
  console.error(error.message);
}

/**
 * Menulis file asychronous
 */

fs.writeFile("data/test.txt", "Hello World secara sycnchronous", (error) => {
  if (error) {
    throw error.message;
  }
  console.log({
    activity: "Menulis file asychronous",
    message: "The file has been saved",
  });
});

/**
 * Membaca isi file synchronous
 */

const data = fs.readFileSync("test.txt", "utf-8"); // atau tambah encoding
console.log({
  activity: "Membaca isi file synchronous",
  data: data.toString(),
}); // return nya <Buffer> harus ubah ke string

/**
 * Memabaca file asynchronous
 */

fs.readFile("test.txt", (error, data) => {
  if (error) {
    throw error;
  }
  console.log({
    activity: "Memabaca file asynchronous",
    data: data.toString(),
  });
});
