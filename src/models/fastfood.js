/* paulineviroux/RIA/egzamen
 *
 * /src/models/fastfood.js - Model for fastfood
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Promise from "bluebird";
import { db } from "../core/mongodb";
import { ObjectID } from "mongodb";

let fCheckFastfood;

fCheckFastfood = function( sBankID ) {
    let oFastfoodID;

    if ( !sFastfoodID ) {
        return Promise.resolve( false );
    }

    try {
        oFastfoodID = new ObjectID( sFastfoodID );
    } catch( oError ) {
        return Promise.reject( new Error( "Invalid Bank ID!" ) );
    }

    return db.collection( "fastfood" )
        .findOne( {
            "_id": oFastfoodID,
        } )
        .then( ( oFastfood ) => {
            if ( oFastfood ) {
                return Promise.resolve( true );
            }

            return Promise.reject( new Error( "Unknown Bank!" ) );
        } );
};


export default function() {
    return db.collection( "fastfood" );
}

export {
    fCheckFastfood as checkFastfood,
};