import { Router } from "express";
import Contact from "../model/contact.js";
import { body, validationResult, check } from "express-validator";

const router = Router();

// index
router.get("/", async (req, res) => {
  const contacts = await Contact.find();

  res.render("contact", {
    title: "Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// Create
router.get("/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
  });
});

// Store
router.post(
  "/",
  [
    body("nama").custom(async (value) => {
      const duplicate = await Contact.findOne({ nama: value });
      if (duplicate) {
        throw new Error("Nama Contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("noHp", "No Hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
      return;
    }

    Contact.insertMany(req.body, (error, result) => {
      req.flash("msg", "Data berhasi; di tambahkan!");
      res.redirect("/contacts");
    });
  }
);

// Delete
router.delete("/", async (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((error, result) => {
    req.flash("msg", "Data berhasi; di hapus!");
    res.redirect("/contacts");
  });
});

// Edit Contact
router.get("/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

router.put(
  "/",
  [
    body("nama").custom(async (value, { req }) => {
      const duplicate = await Contact.findOne({ nama: value });
      if (value != req.body.oldNama && duplicate) {
        throw new Error("Nama Contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("noHp", "No Hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
      return;
    }
    console.log(req.body);
    Contact.updateOne(
      { _id: req.body.id },
      {
        $set: {
          nama: req.body.nama,
          email: req.body.email,
          noHp: req.body.noHp,
        },
      }
    ).then((error, result) => {
      req.flash("msg", "Data berhasil di ubah!");
      res.redirect("/contacts");
    });
  }
);

// Detail
router.get("/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("detail", {
    title: "Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

export default router;
