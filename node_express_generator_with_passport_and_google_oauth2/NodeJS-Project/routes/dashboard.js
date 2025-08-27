import express from 'express';
const router = express.Router();

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}
router.get("/", checkAuthenticated, (req, res) => {
  res.render("dashboard.ejs", {name: req.user.displayName})
});

export default router;
