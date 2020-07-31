/**
 * requiring third party modules and own modules
 */
const router = require('express').Router();
const productController = require('../controller/products');
const multer = require ('multer')
const farmerAuth = require('../middleware/farmerAuth');
const isAuth = require('../middleware/roleAuthorization');

/**
 *@swagger
 * /api/farmers/prods:
 *   post:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.post('/prods',  farmerAuth, isAuth("farmer"), multer().single('image'), productController.createProducts);


/**
 *@swagger
 * /api/farmers/prods:
 *   get:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.get('/prods', farmerAuth, isAuth("farmer"), productController.getProducts);


/**
 *@swagger
 * /api/farmers/prods/:_id:
 *   patch:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.patch('/prods/:_id', farmerAuth, isAuth("farmer"), productController.updateProducts);

/**
 *@swagger
 * /api/farmers/prods/:_id:
 *   delete:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.delete('/:_id', farmerAuth, isAuth("farmer"), productController.deleteProducts);


module.exports = router;
