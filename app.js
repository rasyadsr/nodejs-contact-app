import express, { urlencoded } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import methodOverride from "method-override";

// Koneksi
import "./utils/database.js";

// Routes
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const port = 3000;

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
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

app.use("/contacts", contactRoutes);

app.listen(port, () =>
  console.log("Server Running on port http://localhost:" + port)
);
