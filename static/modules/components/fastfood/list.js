/* paulineviroux/RIA/egzamen
 *
 * /static/modules/components/fastfood/list.js - Fastfood list vue
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Vue from "vue";
import reqwest from "reqwest";
import getLocation from "../../utils/location-manager.js";

let oFastfoodList = Vue.component( "fastfood-list", {
    "data": function() {
        return {
            "loaded": false,
            "fastfood": [],
            "error": null,
        };
    },
    "template": `
        <div class="fastfood-list">
            <div class="loading" v-if="!loaded">
                <p>loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong>
                    {{ error.message }}
                </p>
            </div>
            <ul>
                <li v-for="elt in fastfood">
                    <router-link :to="'/' + elt.id">
                        <strong>{{ elt.name }}</strong>
                        <address>{{ elt.address }}</address>
                    </router-link>
                </li>
            </ul>
        </div>
    `,
    mounted() {
        this.updateFastfood();
    },
    "methods": {
        updateFastfood() {
            // 1. get user's position
            return getLocation()
                .then( ( { coords } ) => {
                    return reqwest( {
                        "url": "/fastfood",
                        "method": "get",
                        "data": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude,
                        },
                    } );
                } )
                .then( ( oResponse ) => {
                    this.loaded = true;
                    this.fastfood = oResponse.data;
                } )
                .catch( this.showError );
        },
        showError( oError ) {
            this.loaded = true;
            this.error = oError;
        },
    },
} );

export default oFastfoodList;