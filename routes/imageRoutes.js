const routes = require('express').Router();
const imageController = require('../controllers/imageControllers');

routes.get('/getImages/:id',imageController.getImages);
routes.post('/createImage',imageController.createImage);
routes.delete('/deleteImage/:id',imageController.deleteImage);
routes.put('/updateImage/:id',imageController.updateImage);


module.exports = routes;