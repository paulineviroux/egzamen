/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/system/ping.js - Controller for system ping
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

export default function( oRequest, oResponse ) {
    oResponse.json( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": true,
        "error": false,
    } );
}