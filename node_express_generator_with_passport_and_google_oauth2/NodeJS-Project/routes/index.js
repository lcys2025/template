import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { company_name: process.env.COMPANY_NAME });
});

export default router;