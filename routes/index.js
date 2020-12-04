const index = require('../controllers/index')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', index.home);






router.get('/prod-create', index.adminGetCreateView)

router.post('/prod-create', index.adminCreateProduct)

router.get('/add-to-cart/:id', index.cartView)

module.exports = router;
