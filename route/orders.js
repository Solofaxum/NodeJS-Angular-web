
const router = require("express").Router()
const OrdersController = require('../controller/orders');
const customerAuth = require('../middleware/customerAuth');
const isAuth = require('../middleware/roleAuthorization');
const farmerAuth = require('../middleware/farmerAuth');

/**
 *@swagger
 * /api/orders:
 *   patch:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.patch('/orders', farmerAuth, isAuth("farmer"), OrdersController.updateOrderStatus);


/**
 *@swagger
 * /api/orders:
 *   get:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.get('/orders', farmerAuth, isAuth("farmer"), OrdersController.getOrders);

/**
 *@swagger
 * /api/:
 *   post:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.post('/', customerAuth, OrdersController.postOrder);

/**
 *@swagger
 * /api/orders:
 *   post:
 *      description : To get one Farmer using his Id. 
 *      responses:
 *        "200":
 *            description : A successful response
 
 */
router.post('/orders', customerAuth, OrdersController.makeOrders);

module.exports = router;