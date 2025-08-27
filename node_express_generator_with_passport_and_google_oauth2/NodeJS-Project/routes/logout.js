import express from 'express';
const router = express.Router();

router.post('/', function(req, res, next) {
  // Call req.logout with a callback function
  req.logout(function(err) {
    if (err) {
      // Handle any errors that occur during logout
      return next(err);
    }
    // Redirect the user to a desired page after successful logout
    res.redirect('/');
  });
});

export default router;
