/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/fastfood/list.js - Controller to list fastfood
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import getFastfoods from "../../models/fastfoods.js";
import { send, error } from "../../core/utils/api.js";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position.js";

const ARC_KILOMETER = 0.009259, // 1 décimale de lat/lng vaut X km
        DEFAULT_RADIUS = 5,
        MAX_RADIUS = 20;


export default function( oRequest, oResponse ) {

    let oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude ), iSearchRadius = +oRequest.query.radius;

    //Check if the position is valid
    if ( !oCurrentPosition ) {
        return error( oRequest, oResponse, "Invalid position", 400 );
    }


    isNaN( iSearchRadius ) && ( iSearchRadius = DEFAULT_RADIUS );
    ( iSearchRadius < DEFAULT_RADIUS ) && ( iSearchRadius = DEFAULT_RADIUS );
    ( iSearchRadius > MAX_RADIUS ) && ( iSearchRadius = MAX_RADIUS );


    iSearchRadius *= ARC_KILOMETER;

    getFastfoods()
        .find( {
            "latitude": {
                "$gt": oCurrentPosition.latitude - iSearchRadius,
                "$lt": oCurrentPosition.latitude + iSearchRadius,
            },
            "longitude":{
                "$gt": oCurrentPosition.longitude - iSearchRadius,
                "$lt": oCurrentPosition.longitude + iSearchRadius,
            },
        } )
        .toArray()
        .then( ( aFastfoods = [] ) => {
            let aCleanFastfoods,
            iCurrentDay = new Date().getDay(),
            iCurrentHour = new Date().getHours() + ( new Date().getMinutes() / 60 );


            // clean useless properties AND compute distance
            aCleanFastfoods = aFastfoods.map( ( { _id, name, slug, address, latitude, longitude, hours } ) => ( {
                "id": _id,
                "distance": distance( oCurrentPosition, { latitude, longitude } ) * 1000,
                "state":(iCurrentHour >= hours[ iCurrentDay ][0] && iCurrentHour <= hours[ iCurrentDay ][1]),
                name, slug, latitude, longitude, address, hours,
            } ) );

            // sort by distance
            aCleanFastfoods.sort( ( oFastfoodOne, oFastfoodTwo ) => oFastfoodOne.distance - oFastfoodTwo.distance );

            
            send( oRequest, oResponse, aCleanFastfoods );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}