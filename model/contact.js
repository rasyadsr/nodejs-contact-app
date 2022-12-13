import mongoose from "mongoose";

// Membuat Schema / Tabel (jika dalam relational Database)
const Contact = mongoose.model("Contact", {
  nama: {
    type: String,
    required: true,
  },
  noHp: {
    type: String,
  },
  email: {
    type: String,
  },
});

export default Contact;
