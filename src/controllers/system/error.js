/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/system/error.js - Controller for system error
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { error } from "../../core/utils/api.js";

export default function( oRequest, oResponse ) {
    error( oRequest, oResponse, { "message": "There's an error!" } );
}