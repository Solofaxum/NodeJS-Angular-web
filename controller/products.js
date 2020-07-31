/**
 * products controller
 */
const Farmer = require('../model/farmers');
const { Storage } = require("@google-cloud/storage");
const path = require('path');


/**
 * create product by farmers and saving their products in the cloude
 */
exports.createProducts = async (req, res, next) => {
    console.log(req.file);
    try {
        /**google cloude storage creation */
        const localDirectory= path.join(__dirname, '../config/cloudeKey.json');
        const googleCloude = new Storage({
            keyFilename: localDirectory,
            projectId: 'farmers-market-association'
        })

        const farmersBucket = googleCloude.bucket("farmers-market-association");
        const useName = Date.now() + req.file.originalname;
        // console.log(originalname);
        const file = farmersBucket.file(useName);
        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })
        
        const imageTitleUrl = `https://storage.googleapis.com/farmers-market-association/${useName}`
        stream.end(req.file.buffer)
        stream.on('finish', async () => {
            
            await Farmer.updateOne({ _id: req.farmer._id },
                {
                    $push: {
                        products: {
                            farmname: req.body.farmname,
                            title: req.body.title,
                            price: req.body.price,
                            describtion: req.body.describtion,
                            image: imageTitleUrl
                        }
                    }
                });
                console.log("image url " + image);
            res.status(201).json({ success: true, data: products.body })
        })
        stream.on('error', (error) => {
            res.json({ success: false, error: error.message })
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }
}

/**
 * get products by farmers and pagination 
 */
exports.getProducts = async (req, res, next) => {
    // const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);

    // const startIndex = (page - 1) * limit;
    // const endIndex = 8;
    try {
        let productList = await Farmer.findOne({ _id: req.farmer._id });
        console.log(productList);
        // const myPage = productList.slice(startIndex, endIndex)
        res.status(200).json({
            success: true,
            data: productList.products
        })
    } catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }

}

/**
 * update own products by farmers
 */
exports.updateProducts = async (req, res, next) => {

    try {
        let result = await Farmer.updateOne(
            { _id: req.farmer._id, "products._id": req.params._id },
            {
                $set: { "products.$": req.body }
            });
        // console.log("check " + result);
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }

}

/**
 * delete own products by farmers
 */
exports.deleteProducts = async (req, res, next) => {
    // console.log(req.farmer._id);
    // console.log(req.params._id);
    try {
        let farmerId = await Farmer.findOne({ _id: req.farmer._id });
        farmerId.products.pull({ _id: req.params._id });
        farmerId.save();


        res.status(200).json({ success: true, data: "Successfully deleted " })
    } catch (error) {
        res.status(304).json({ success: false, data: "Id is not found" })
    }

};
