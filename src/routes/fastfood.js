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
import create from "../controllers/fastfood/create.js";
import destroy from "../controllers/fastfood/destroy.js";

let oRouter = new Router();

oRouter.get( "/fastfood", list );
oRouter.get( "/fastfood/:id", details );
oRouter.post( "/fastfood", create );
oRouter.delete( "/fastfood/:id", destroy );

export default oRouter;

