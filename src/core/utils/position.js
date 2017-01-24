/* paulineviroux/RIA/egzamen
 *
 * /src/core/utils/position.js - Check position
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

export default function( iLatitude, iLongitude ) {
    let oPosition;

    if ( isNaN( iLatitude ) || isNaN( iLongitude ) ) {
        return false;
    }

    if ( iLatitude < -90 || iLatitude > 90 ) {
        return false;
    }

    if ( iLongitude < -180 || iLongitude > 180 ) {
        return false;
    }

    return {
        "latitude": iLatitude,
        "longitude": iLongitude,
    }
}