/* paulineviroux/RIA/egzamen
 *
 * /src/server.js - gulp tasks
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { init as initDB } from "./core/mongodb";
import { init as initExpress } from "./core/express";

const APP_PORT = 12345;

initDB()
    .then( () => initExpress( APP_PORT ) );
