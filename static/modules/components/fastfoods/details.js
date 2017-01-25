/* paulineviroux/RIA/egzamen
 *
 * /static/modules/components/fastfood/details.js - Fastfood details vue
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */


import Vue from "vue";
import reqwest from "reqwest";
import getLocation from "../../utils/location-manager.js";

let oFastfoodDetails = Vue.component( "fastfood-details", {
    "data": function() {
        return {
            "loaded": false,
            "fastfood": {},
            "error": null,
        };
    },
    "template": `
        <div class="fastfood-details">
            <div class="loading" v-if="!loaded">
                <p>loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong>
                    {{ error.message }}
                </p>
            </div>
            <div v-if="loaded" class="main">
                <h2 class="main__title">Détails dun fastfood</h2>
                <p class="main__p">{{ fastfood.name }}</p>
                <span v-if="!resto.state">Fermé</span>
                <span v-if="resto.state">Ouvert</span>
                <address class="main__address">{{ fastfood.address }}</address>
                <p class="main__p">{{ fastfood.hours }}</p>
            </div>

            <router-link to="/">&lsaquo; retour
            <p class="main__p">{{ fastfood.name }}</p></router-link>
        </div>
    `,
    mounted() {
        this.fetchInfos( this.$route.params.id );
    },

    "method": {
        fetchInfos( sFastfoodId ) {
            return getLocation()
                .then( ( { coords } ) => {
                    return reqwest( {
                        "url": `/fastfoods/${ sFastfoodId }`,
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
                    this.fastfood = oFastfood;
                } )
                .catch( this.showError );
        },
        showError( { message } ) {
            this.loaded = true;
            this.error = message;
        },
    },
} );

export default oFastfoodDetails;