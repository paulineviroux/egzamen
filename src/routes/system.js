/* paulineviroux/RIA/egzamen
 *
 * /src/routes/system.js - System Routes
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { Router } from "express";

import sysPingController from "../controllers/system/ping";

let oRouter = new Router();

oRouter.get( "/sys/ping", sysPingController );
// oRouter.get( "/sys/echo" );
// oRouter.get( "/sys/error" );

export default oRouter;