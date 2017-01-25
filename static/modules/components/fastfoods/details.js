/* paulineviroux/RIA/egzamen
 *
 * /src/static/modules/components/fastfoods/details.js - Controllers for fastfood details
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Vue from "vue";
import reqwest from "reqwest";
import getLocation from "../../utils/location-manager.js";

let ofastfoodDetails = Vue.component( "fastfood-details", {
    "data": function() {
        return {
            "loaded": false,
            "fastfood": {},
            "error": null,
        };
    },
    "template": `
        <div class="fastfood-details">
            <h1 class="fastfood-details__title">Détails du quick</h1>
            <div class="loading" v-if="!loaded">
                <p>Loading...</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong> {{ error }}
                </p>
            </div>
            <div v-if="loaded" class="main">
                <h2 class="main__title">{{ fastfood.name }}</h2>
                <address class="main__address">{{ fastfood.address }}</address>
            
                <div class="coordonnees">
                    <h3 class="coordonnees__title">Coordonnées</h3>
                    <p class="coordonnees__p">Latitude: {{ fastfood.latitude }}</p>
                    <p class="coordonnees__p">Longitude: {{ fastfood.longitude }}</p>
                </div>
                <div class="horaire">
                    <h3 class="horaire__title">Horaire</h3>
                    <table class="horaire__table">
                        <tbody>
                            <tr>
                                <th>Jour</th>
                                <th>Ouverture</th>
                                <th>Fermeture</th>
                            </tr>
                            <tr>
                                <td>Lundi</td>
                                <td>{{ fastfood.hours[ 0 ][ 0 ] }} h</td>
                                <td>{{ fastfood.hours[ 0 ][ 1 ] }} h</td>
                            </tr>
                            <tr>
                                <td>Mardi</td>
                                <td>{{ fastfood.hours[ 1 ][ 0 ] }} h</td>
                                <td>{{ fastfood.hours[ 1 ][ 1 ] }} h</td>
                            </tr>
                            <tr>
                                <td>Mercredi</td>
                                <td>{{ fastfood.hours[ 2 ][ 0 ] }} h</td>
                                <td>{{ fastfood.hours[ 2 ][ 1 ] }} h</td>
                            </tr>
                            <tr>
                                <td>Jeudi</td>
                                <td>{{ fastfood.hours[ 3 ][ 0 ] }} h</td>
                                <td>{{ fastfood.hours[ 3 ][ 1 ] }} h</td>
                            </tr>
                            <tr>
                                <td>Vendredi</td>
                                <td>{{ fastfood.hours[ 4 ][ 0 ] }} h</td>
                                <td>{{ fastfood.hours[ 4 ][ 1 ] }} h</td>
                            </tr>
                            <tr>
                                <td>Samedi</td>
                                <td>{{ fastfood.hours[ 5 ][ 0 ] }} h</td>
                                <td>{{ fastfood.hours[ 5 ][ 1 ] }} h</td>
                            </tr>
                            <tr>
                                <td>Dimanche</td>
                                <td>{{ fastfood.hours[ 6 ][ 0 ] }} h</td>
                                <td>{{ fastfood.hours[ 6 ][ 1 ] }} h</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <router-link to="/" class="main__retour">&lsaquo; Retour</router-link>
            </div>
        </div>
    `,
    mounted() {
        this.fetchInfos( this.$route.params.id );
    },
    "methods": {
        fetchInfos( sfastfoodID ) {
            // current possition
            return getLocation()
                .then( ( { coords } ) => {
                    return reqwest( {
                        "url": `/fastfoods/${ sfastfoodID }`,
                        "method": "get",
                        "data": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude,
                        },
                    } );
                } )
                .then( ( oResponse ) => {
                    let ofastfood = oResponse.data;

                    this.loaded = true;
                    this.fastfood = ofastfood;
                } )
                .catch( this.showError );
        },
        showError( { message } ) {
            this.loaded = true;
            this.error = message;
        },
    },
} );

export default ofastfoodDetails;