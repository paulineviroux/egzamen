/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/system/echo.js - Controller for system echo
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { send } from "../../core/utils/api.js";

export default function( oRequest, oResponse ) {
    let sEcho = oRequest.query.echo || "Hola!!";

    send( oRequest, oResponse, sEcho );
}