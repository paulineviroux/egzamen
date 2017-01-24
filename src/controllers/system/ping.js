/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/system/ping.js - Controller for system ping
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { send } from "../../core/utils/api.js";

export default function( oRequest, oResponse ) {
    send( oRequest, oResponse, true );
}