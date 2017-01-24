/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/fastfood/destroy.js - Delete fastfood controller
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { ObjectID } from "mongodb";
import { send, error } from "../../core/utils/api.js";
import getFastfood from "../../models/fastfood.js";

export default function( oRequest, oResponse ) {

    let oFastfoodID;

    try {
        oFastfoodID = new ObjectID( oRequest.params.id );
    } catch ( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
    }

    getFastfood()
        .deleteOne( {
            "_id": oFastfoodID,
        } )
        .then( ( { deletedCount } ) => {
            if ( deletedCount === 1 ) {
                return send( oRequest, oResponse, null, 204 );
            }

            return error( oRequest, oResponse, "Unknown deletion error", 500 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}