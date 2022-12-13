import { Router } from "express";
import Contact from "../model/contact.js";

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
