
const router = require('express').Router();
const userController = require ('../controller/customers');
const customerAuth = require('../middleware/customerAuth');
const isAuth = require('../middleware/roleAuthorization');
const farmerAuth = require('../middleware/farmerAuth');


/**
 *@swagger
 * /api/customers/signup:
 *   post:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.post('/signup', userController.customerSignup);

/**
 *@swagger
 * /api/customers/login:
 *   post:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.post('/login',  userController.customerLogin);


/**
 *@swagger
 * /api/customers/admins:
 *   get:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.get('/admins', farmerAuth, isAuth("superuser"), userController.getCustomers);

/**
 *@swagger
 * /api/customers/admins/:
 *   patch:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.patch('/admins/', farmerAuth, isAuth("superuser"), userController.updateCustomersStatus);

/**
 *@swagger
 * /api/customers/admins/:id:
 *   patch:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.patch('/admins/:id', farmerAuth, isAuth("superuser"), userController.updateCustomer);


/**
 *@swagger
 * /api/customers/farmers:
 *   get:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.get('/farmers', customerAuth, userController.getFarmerList);

/**
 *@swagger
 * /api/customers/carts:
 *   get:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.get('/carts', customerAuth, userController.getcarts);


/**
 *@swagger
 * /api/customers/carts:
 *   post:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.post('/carts', customerAuth, userController.addCart);



module.exports = router;