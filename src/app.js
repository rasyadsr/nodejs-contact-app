import express, { urlencoded } from "express";
import { body, validationResult, check } from "express-validator";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
/**
 * library untuk memudahkan layouting menggunakan ejs
 * jadi ga perlu include header / footer di tiap halaman
 * konsep nya seperti @extends dan @yields pada blade laravel
 */
import expressEjsLayouts from "express-ejs-layouts";
import {
  loadContact,
  findContactByNama,
  addContact,
  checkDuplicate,
  deleteContact,
  updateContact,
} from "./../utils/contacts.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));

/**
 * Konfigurasi flash
 */
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: {
      maxAge: 6000,
    },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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

// Index
app.get("/contact", (req, res) => {
  const contacts = loadContact();

  res.render("contact", {
    title: "Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

/**
 * Ini harus di simpan sebelum
 * /contact/:nama
 * kalau ngga gini, dia akan tetap masuk
 * ke /contact/:nama
 */

// Create
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
  });
});

// Store
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplicate = checkDuplicate(value);
      if (duplicate) {
        /**
         * throew new Error = return false dengan pesan
         * butuh pesan error supaya masuk ke errors = validationResult(req)
         */
        throw new Error("Nama Contact sudah digunakan!");
      }
      /**
       * Kalau validasi lolos return true
       */
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("noHP", "No Hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
      return;
    }

    addContact(req.body);
    // Kirimkan flash message
    req.flash("msg", "Data berhasi; di tambahkan!");
    res.redirect("/contact");
  }
);

// Delete
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContactByNama(req.params.nama);
  if (!contact) {
    res.status(404).send("404");
    return;
  }
  deleteContact(req.params.nama);
  req.flash("msg", "Data berhasi; di hapus!");
  res.redirect("/contact");
});

// Edit Contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContactByNama(req.params.nama);
  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.post(
  "/contact/update",
  [
    /**
     * Express validator memungkingkan validasi custome
     * bisa memamnggil object req
     */
    body("nama").custom((value, { req }) => {
      const duplicate = checkDuplicate(value);
      if (value != req.body.oldNama && duplicate) {
        /**
         * throew new Error = return false dengan pesan
         * butuh pesan error supaya masuk ke errors = validationResult(req)
         */
        throw new Error("Nama Contact sudah digunakan!");
      }
      /**
       * Kalau validasi lolos return true
       */
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("noHP", "No Hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
      return;
    }
    updateContact(req.body);
    // Kirimkan flash message
    req.flash("msg", "Data berhasil di ubah!");
    res.redirect("/contact");
  }
);

// Detail
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
