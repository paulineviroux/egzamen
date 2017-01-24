/* paulineviroux/RIA/egzamen
 *
 * /static/modules/location-manager.js - Location manager
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Promise from "bluebird";

const DEFAULT_OPTIONS = { "enableHighAccuracy": true },
        TTL = 60 * 1000; // 60s

let oLastPosition;

export default function( oOptions = {} ) {
    if ( oLastPosition && Date.now() - oLastPosition.timestamp < TTL ) {
        return Promise.resolve( oLastPosition );
    }
    return new Promise( function( fResolve, fReject ) {
        navigator.geolocation.getCurrentPosition( ( ( oPosition ) => fResolve( oLastPosition = oPosition ) ), fReject, Object.assign( {}, DEFAULT_OPTIONS, oOptions ) );
    } );
};