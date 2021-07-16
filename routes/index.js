var express = require('express');
var router = express.Router();
const controller = require('../controllers/Controller.js')
/* express validator (npm install express-validator) */
const { check, validationResult } = require('express-validator');

/* GET home page. */
//router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' ,name:'john' });
//});

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('home');
//});
router.get('/',controller.home)


/* GET assetMapping Page. */
//router.get('/assetMapping', function(req, res, next) {
 // res.render('assetMapping');
//});

router.get('/assetMapping',controller.assetMapping)

/* GET RCSA Home Page. */
//router.get('/RCSA', function(req, res, next) {
//  res.render('RCSA');
//});
router.get('/RCSA',controller.RCSA)

/* GET chartPage. */
//router.get('/chart', function(req, res, next) {
 // res.render('chart');
//});
//MVC version
router.get('/chart',controller.chart)

router.get('/test',controller.test)

router.get('/homePage',controller.homePage)

/*GET /form Page.*/
//router.get('/form', function(req, res, next) {
  //res.render('form', { title: 'Express'});
//});


//router.get('/home', function(req, res, next) {
  //res.render('home', { title: 'Express' ,name:'john' });
//});
/*POST /form Page.*/
//router.post('/submitForm', function(req, res, next) {

 // console.log(req.body);
//  res.render('form',  { title: 'Express'});
//});



router.get('/xl',controller.xl)

module.exports = router;
