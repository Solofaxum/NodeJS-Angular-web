
const router = require('express').Router();
const userController = require ('../controller/farmers');
const isAuth = require('../middleware/roleAuthorization');
const farmerAuth = require('../middleware/farmerAuth');

/**
 *@swagger
 * /api/farmers/signup:
 *   post:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "201":
 *            description : successfully created
 *        "404":
 *            description : A page not found
 
 */
router.post('/signup',  userController.farmerSignup);


/**
 *@swagger
 * /api/farmers/login:
 *   post:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.post('/login', userController.farmerLogin);


/**
 *@swagger
 * /api/farmers/admins:
 *   get:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.get('/admins',  farmerAuth, isAuth("superuser"), userController.getFarmers);


/**
 *@swagger
 * /api/farmers/admins/:id:
 *   patch:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.patch('/admins/:id', farmerAuth, isAuth("superuser"), userController.updateFarmer);


/**
 *@swagger
 * /api/farmers/admins:
 *   patch:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.patch('/admins', farmerAuth, isAuth("superuser"), userController.updateFarmStatus);



module.exports = router;