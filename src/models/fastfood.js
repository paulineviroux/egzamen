/* paulineviroux/RIA/egzamen
 *
 * /src/models/fastfood.js - Model for fastfood
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import { db } from "../core/mongodb";

export default function() {
    return db.collection( "fastfood" );
}