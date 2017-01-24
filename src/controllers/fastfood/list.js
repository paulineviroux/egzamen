/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/fastfood/list.js - Model for fastfood
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import getFastfood from "../../models/fastfood.js";
import { send, error } from "../../core/utils/api";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position.js";

const ARC_KILOMETER = 0.009259, // 1 décimale de lat/lng vaut X km
        DEFAULT_RADIUS = 5,
        MAX_RADIUS = 20;


export default function( oRequest, oResponse ) {

    let oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude ), iSearchRadius = +oRequest.query.radius;

    if ( !oCurrentPosition ) {
        return error( oRequest, oResponse, "Invalid position", 400 );
    }


    ( isNaN( iSearchRadius ) ) && ( iSearchRadius = DEFAULT_RADIUS );
    ( iSearchRadius < DEFAULT_RADIUS ) && ( iSearchRadius = DEFAULT_RADIUS );
    ( iSearchRadius > MAX_RADIUS ) && ( iSearchRadius = MAX_RADIUS );


    iSearchRadius *= ARC_KILOMETER;

    getFastfood()
        .find( {
            "latitude": {
                "$gt": oCurrentPosition.latitude - iSearchRadius,
                "$lt": oCurrentPosition.latitude + iSearchRadius,
            },
            "longitude":{
                "$gt": oCurrentPosition.longitude - iSearchRadius,
                "$lt": oCurrentPosition.longitude + iSearchRadius,
            },
            "deleted_at": null,
        } )
        .toArray()
        .then( ( aFastfood = [] ) => {
            let aCleanFastfood;


            // clean useless properties AND compute distance
            aCleanFastfood = aFastfood.map( ( { _id, name, slug, address, latitude, longitude } ) => ( {
                "id": _id,
                "distance": distance( oCurrentPosition, { latitude, longitude } ) * 1000,
                name, slug, latitude, longitude, address,
            } ) );

            // sort by distance
            aCleanFastfood.sort( ( oFastfoodOne, oFastfoodTwo ) => oFastfoodOne.distance - oFastfoodTwo.distance );

            
            send( oRequest, oResponse, aCleanFastfood );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}