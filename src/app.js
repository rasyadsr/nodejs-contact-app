import express from "express";
/**
 * library untuk memudahkan layouting menggunakan ejs
 * jadi ga perlu include header / footer di tiap halaman
 * konsep nya seperti @extends dan @yields pada blade laravel
 */
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressEjsLayouts);

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

app.get("/:id", (req, res) => {
  res.send("Your Param id is : " + req.params.id);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
