/* paulineviroux/RIA/egzamen
 *
 * /src/static/modules/components/fastfood/list.js - Fastfood list vue
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Vue from "vue";
import reqwest from "reqwest";
import getLocation from "../../utils/location-manager.js";

let oFastfoodsList = Vue.component( "fastfoods-list", {
    "data": function() {
        return {
            "loaded": false,
            "fastfoods": [],
            "error": null,
        };
    },
    "template": `
        <div class="fastfoods-list">
            <div class="loading" v-if="!loaded">
                <p>Loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong>
                    {{ error.message }}
                </p>
            </div>
            <div class="main">
            <h2 class="main__title">Les Quicks à proximité</h2>
                <ul class="main__list">
                    <li class="main__item" v-for="elt in fastfoods">
                        <router-link :to="'/' + elt.id" class="main__link">
                            <h3 class="main__name">{{ elt.name }}</h3>
                            <address>{{ elt.address }}</address>
                        </router-link>
                    </li>
                </ul>
            </div>
        
        </div>
    `,
    mounted() {
        this.updateFastfoods();
    },
    "methods": {
        updateFastfoods() {
            // 1. get user's position
            return getLocation()
                .then( ( { coords } ) => {
                    return reqwest( {
                        "url": "/fastfoods",
                        "method": "get",
                        "data": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude,
                        },
                    } );
                } )
                .then( ( oResponse ) => {
                    let oFastfood = oResponse.data;

                    this.loaded = true;
                    this.fastfoods = oFastfood;
                } )
                .catch( this.showError );
        },
        showError( oError ) {
            this.loaded = true;
            this.error = oError;
        },
    },
} );

export default oFastfoodsList;