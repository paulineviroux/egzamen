/* paulineviroux/RIA/egzamen
 *
 * /src/controllers/fastfood/create.js - Create fastfood controller
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Promise from "bluebird";
import { ObjectID } from "mongodb";

import getFastfoods from "../../models/fastfoods.js";
import { send, error } from "../../core/utils/api.js";
import checkPosition from "../../core/utils/position.js";

export default function( oRequest, oResponse ) {

    const POST = oRequest.body;

    let iLatitude = +POST.latitude,
        iLongitude = +POST.longitude,
        sName = ( POST.name || "" ).trim(), // trim : vider les caractere vide. 
        sAddress = ( POST.address || "" ).trim(),
        oPosition = checkPosition( iLatitude, iLongitude ),
        aHours = POST.hours,
        sSlug = sName.replace( " ", "-" ).toLowerCase(), 
        oFastfood = {};

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
    aHours && ( oFastfood.hours = aHours );
    sSlug && ( oFastfood.slug = sSlug );

    getFastfoods()
        .insertOne( oFastfood )
        .then( () => {
            send( oRequest, oResponse, {
                "id": oFastfood._id,
                "name": oFastfood.name || null,
                "address": oFastfood.address || null,
                "slug": oFastfood.slug || null ,
                "latitude": oFastfood.latitude,
                "longitude": oFastfood.longitude,
                "hours": oFastfood.hours,
            }, 201 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}