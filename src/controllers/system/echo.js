/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/system/echo.js - Controller for system echo
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */


export default function( oRequest, oResponse ) {
    let sEcho = oRequest.query.echo || "hello, world!";

    oResponse.send( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": sEcho,
        "error": false,
    } );
}