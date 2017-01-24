/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/fastfood/update.js - Update fastfood controller
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { ObjectID } from "mongodb";

import getFastfood from "../../models/fastfood.js";
import { checkFastfood } from "../../models/fastfood.js";
import { send, error } from "../../core/utils/api.js";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position.js";

const MAX_MOVE_DISTANCE = 0.1; // in km

export default function( oRequest, oResponse ) {

    // 1. get values

    const POST = oRequest.body;

    let oFastfoodID,
        sAddress = ( POST.address || "" ).trim(),
        iLatitude = POST.latitude,
        iLongitude = POST.longitude,
        sName = ( POST.name || "" ).trim(),
        sSlug = sName.toLowercase().replace( " ", "-" ),
        aHours = POST.hours,
        sFastfoodID = ( POST.bank || "" ).trim(),
        oPosition, aModifications = [];

    try {
        oFastfoodID = new ObjectID( oRequest.params.id );
    } catch( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
    }

    // 2. check if Fastfood exists

    getFastfood()
        .findOne( {
            "_id": oFastfoodID,
        } )
        .then( ( oFastfood ) => {
            if ( !oFastfood ) {
                return error( oRequest, oResponse, new Error( "Unknown Fastfood" ), 404 );
            }


            // 3. check values

            // 3a. check position
            if ( iLatitude != null && iLongitude != null ) {
                oPosition = checkPosition( +iLatitude, +iLongitude );
                if ( !oPosition ) {
                    return error( oRequest, oResponse, new Error( "Invalid position" ), 400 );
                }

                // if position ≠ old position, check move distance
                if ( oFastfood.latitude !== oPosition.latitude || oFastfood.longitude !== oPosition.longitude ) {
                    if ( distance( oPosition, oFastfood ) > MAX_MOVE_DISTANCE ) {
                        return error( oRequest, oResponse, new Error( "Movement is too big" ), 400 );
                    }
                    oFastfood.latitude = oPosition.latitude;
                    oFastfood.longitude = oPosition.longitude;
                    aModifications.push( "latitude", "longitude" );
                }
            }

            // 3b. check address
            if ( sAddress ) {
                oFastfood.address = sAddress;
                aModifications.push( "address" );
            }

            // 3c. check empty
            if ( sName ) {
                oFastfood.name = sName;
                oFastfood.slug = sSlug;
                aModifications.push( "name", "slug" );
            }

            //3d. check hours
            if ( sName ) {
                oFastfood.hours = aHours;
                aModifications.push( "hours" );
            }

            // 3d. if Fastfood changes, check it
            return checkFastfood( oFastfoodID ).then( () => {

                let oModificationsToApply = {};

                if ( aModifications.length === 0 ) {
                    return error( oRequest, oResponse, new Error( "No changes" ), 400 );
                }

                aModifications.forEach( ( sPropertyName ) => {
                    oModificationsToApply[ sPropertyName ] = oFastfood[ sPropertyName ];
                } );

                oModificationsToApply.updated_at = new Date();

                return getFastfoods()
                    .updateOne( {
                        "_id": oFastfood._id,
                    }, {
                        "$set": oModificationsToApply,
                    } )
                    .then( ( { matchedCount, modifiedCount } ) => {
                        if ( matchedCount !== 1 || modifiedCount !== 1 ) {
                            return error( oRequest, oResponse, new Error( "Unknown save error" ), 500 );
                        }

                        return send( oRequest, oResponse, null, 204 );
                    } );
            } );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}