import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    return res.redirect("/face");
  }
  res.render("login", { error: "Invalid credentials" });
});

export default router;
