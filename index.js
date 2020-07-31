/**Imported dependencies */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require('cors');
const swagger = require("swagger-jsdoc");
const uiswagger = require("swagger-ui-express")


/**local */
const customerRouth = require('./route/customers');
const farmerRouth = require('./route/farmers');
const productsRoute = require('./route/products');
const orderRouth = require('./route/orders')


const app = express();

const API_PORT = process.env.API_PORT || 7000;

app.use(cors({ origin: '*' }));
app.use(express.json());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**header options */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


/** Swagger api control */
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Farmers Online Market",
      description: "By Solomon Gebreslasie: List Of API Datas",
      contact: {
        name: "Solomon Gebreslasie"
      },
      servers: ["http://localhost:7000"]
    }
  },
  apis: ['./route/*.js']
};

const myswagger = swagger(swaggerOptions);
app.use("/api-docs", uiswagger.serve, uiswagger.setup(myswagger));

/* *Route middlewares */
app.use('/api/farmers', farmerRouth);
app.use('/api/farmers', productsRoute);
app.use('/api/customers', customerRouth);
app.use('/api', orderRouth);


/**angular app deploy  */


/**Connect mongoose and server listening */
mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('db connectd')
).then((data) => {

  app.use (express.static('farmers-market')); // node server will treat the folder as static
  app.listen(API_PORT, () => {
    console.log(`server is running at port ${API_PORT}.....🐊 ....🚀`)
  })
})


