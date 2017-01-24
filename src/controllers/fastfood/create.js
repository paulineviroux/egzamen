/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/fastfood/create.js - Create fastfood controller
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Promise from "bluebird";
import { ObjectID } from "mongodb";

import getFastfood from "../../models/fastfood.js";
import { send, error } from "../../core/utils/api.js";
import checkPosition from "../../core/utils/position.js";

export default function( oRequest, oResponse ) {

    const POST = oRequest.body;

    let iLatitude = +POST.latitude,
        iLongitude = +POST.longitude,
        sName = ( POST.name || "" ).trim(),
        sAddress = ( POST.address || "" ).trim(),
        oPosition = checkPosition( iLatitude, iLongitude ),
        aHours = POST.hours,
        sSlug = sName.toLowerCase().replace( " ", "-" ), 
        oFastfood;

    if ( !oPosition ) {
        return error( oRequest, oResponse, "Invalid position", 400 );
    }

    oFastfood = {
        "latitude": oPosition.latitude,
        "longitude": oPosition.longitude,
        "created_at": new Date(),
        "updated_at": new Date(),
    };

    sName && ( oFastfood.name = sName );
    sAddress && ( oFastfood.address = sAddress );
    sHours && ( oFastfood.hours = aHours );
    sSlug && ( oFastfood.slug = sSlug );

    getFastfood()
        .insertOne( oFastfood )
        .then( () => {
            send( oRequest, oResponse, {
                "id": oFastfood._id,
                "name": oFastfood.name || null,
                "address": oFastfood.address || null,
                "slug": oFastfood.slug,
                "latitude": oFastfood.latitude,
                "longitude": oFastfood.longitude,
                "hours": oFastfood.hours,
            }, 201 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}