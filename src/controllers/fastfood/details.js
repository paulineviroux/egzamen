/* paulineviroux/RIA/egzamen
 *
 * /src/core/utils/position.js - Controllers for fastfood details
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */


import getFastfood from "../../models/fastfood.js";
import { send, error } from "../../core/utils/api";
import { ObjectID } from "mongodb";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position.js";

export default function( oRequest, oResponse ) {

    let sFastfoodID = ( oRequest.params.id || "" ).trim(),
        oCurrentPosition;

    if ( !sFastfoodID ) {
        error( oRequest, oResponse, "Invalid ID!", 400 );
    }

    oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude );

    getFastfood()
        .findOne( {
            "_id": new ObjectID( sFastfoodID ),
            "deleted_at": null,
        } )
        .then( ( oFastfood ) => {
            if( !oFastfood ) {
                return error( oRequest, oResponse, "Unknown Fastfood", 404 );
            }

            let { _id, name, latitude, longitude, address, hours } = oFastfood,
                oCleanFastfood;

            oCleanFastfood = {
                "id": _id,
                name, latitude, longitude, address, hours,
            };

            if ( oCurrentPosition ) {
                oCleanFastfood.distance = distance( oCurrentPosition, oCleanFastfood ) * 1000;
            }

            send( oRequest, oResponse, oCleanTerminal );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}