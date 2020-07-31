# NodeJS-Angular-web
This was part of my final project in MIU - web application development with angular and node js. I use my ready for production angular app with ng build --prod (AOT).


## Standard Project Details
- During the pandemic COVID-19, farmers are no longer able to sell their products and
customers are no longer able to buy fresh local food.
Ywe will design:
1. A web application for farmers (React or Angular) to add their products,
browse orders, and contact customers when orders are ready for
contactless pickup.
3. Backend REST API (NodeJS, MongoDB) to support both applications
above.
# Web Application Workflow
- Farmers will sign up/sign in before they can use the application.
- Main functionalities are Add, Delete, Update, Retrieve products (as inventory).
- Orders have 3 status, pending, ready, complete.
- Farmers can see all orders and filter them by status.
- Once the order is prepared and ready for pick up, the farmer will update the order status to â€˜readyâ€™, and an automatic email will be sent to customers with the pick-up date and time.
- Once the order is picked up, farmers will update the order status to â€˜completeâ€™.
# Superuser Account
- The user collection in the database must have a superuser account. (Role is superuser).
- Superuser may log in to the Web Application (similar to farmerâ€™s) and see a dashboard
with the following functionalities.
- List all farmers and customers accounts, activates/deactivates and reset their
password.
- List all transactions and filter them by date.
- List all requests in the log file. (check the technical details)
# Technical Details 
- All pictures must be uploaded and stored on either Amazon S3 or Google Cloud
Storage.
- Use JWT for authentication and authorization.
- You need to follow REST convention to build the server application.
- The backend API documentation contains the following:
- Entity, HTTP Verb, Request Header and Body, Response Header,
and Body (You may use Swagger to generate this API
documentation).
- Use Github issue tracking to plan your daily schedule/tasks.
- Use feature branches for each task/issue/feature.
- A daily push is required.
- Deploy the server-side application and the client web application to the Cloud.
- Log all the backend API requests to a file.


