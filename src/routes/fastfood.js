/* paulineviroux/RIA/egzamen
 *
 * /src/routes/fastfood.js - API Routes for fastfood
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { Router } from "express";

import list from "../controllers/fastfood/list.js";
import details from "../controllers/fastfood/details.js";

let oRouter = new Router();

oRouter.get( "/fastfood", list );
oRouter.get( "/fastfood", details );

export default oRouter;

