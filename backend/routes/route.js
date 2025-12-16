import { Router } from "express";
import { Controller } from "../controllers/controllers.js";
import { Model } from "../models/mysql/model.js";  

export const createRouter = () => {
  const router = Router();

  const controller = new Controller ({Model: Model})

  router.get('/products',   controller.getProducts);
  router.get('/products/:id',   controller.getOneProduct);
  router.post('/login',   controller.logIn);
  router.post('/signup',   controller.signUp);
  router.put('/editProfile',   controller.editProfile);
  router.post('/logout',   controller.logOut);
  router.get('/user',   controller.getUserInfo);
  router.get('/cart',   controller.getCartItems);
  router.post('/cart/add',   controller.insertCartItems);
  router.delete('/cart/delete/:cartId',   controller.deleteCartItems);
  router.put('/cart/chageQuantity/:cartId',   controller.updateQuantityCartItems);
  router.get('/historical',   controller.getHistoricalInfo);
  router.post('/historical/insert',   controller.insertHistoricalInfo);

  return router; 
};