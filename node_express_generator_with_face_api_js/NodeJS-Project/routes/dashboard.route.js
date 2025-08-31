import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    console.log('Accessing dashboard, session user:', req.session.user);
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("dashboard", {
        user: req.session.user,
        loginMethod: req.session.user.loginMethod
    });
});

export default router;
