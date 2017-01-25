/* paulineviroux/RIA/egzamen
 *
 * /src/routes/fastfood.js - API Routes for fastfood
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { Router } from "express";

import list from "../controllers/fastfoods/list.js";
import details from "../controllers/fastfoods/details.js";
import create from "../controllers/fastfoods/create.js";
import update from "../controllers/fastfoods/update.js";
import destroy from "../controllers/fastfoods/destroy.js";

let oRouter = new Router();

oRouter.get( "/fastfoods", list );
oRouter.get( "/fastfoods/:id", details );
oRouter.post( "/fastfoods", create );
oRouter.patch( "/fastfoods/:id", update );
oRouter.delete( "/fastfoods/:id", destroy );

export default oRouter;

