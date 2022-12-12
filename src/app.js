import express from "express";
/**
 * library untuk memudahkan layouting menggunakan ejs
 * jadi ga perlu include header / footer di tiap halaman
 * konsep nya seperti @extends dan @yields pada blade laravel
 */
import expressEjsLayouts from "express-ejs-layouts";
import { loadContact, findContactByNama } from "./../utils/contacts.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "rasyad",
      email: "rasyad@gmail.com",
    },
    {
      nama: "erik",
      email: "erik@gmail.com",
    },
    {
      nama: "ricardo",
      email: "ricardo@gmail.com",
    },
  ];
  res.render("index", {
    nama: "Mochamad Rasyad",
    mahasiswa,
    layout: "layouts/main-layout", // ini untuk memberi tahu layout yang digunakan
    title: "Index",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    layout: "layouts/main-layout",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();

  res.render("contact", {
    title: "Contact",
    layout: "layouts/main-layout",
    contacts,
  });
});

app.get("/contact/:nama", (req, res) => {
  const contact = findContactByNama(req.params.nama);

  res.render("detail", {
    title: "Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.use("/", (req, res, next) => {
  res.status(404).send("404 Not Found");
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
