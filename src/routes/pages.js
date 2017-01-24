/* paulineviroux/RIA/egzamen
 *
 * /src/routes/pages.js - Pages Routes
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { Router } from "express";

import homepageController from "../controllers/pages/home.js";

let oRouter = new Router();

oRouter.get( "/", homepageController );

export default oRouter;