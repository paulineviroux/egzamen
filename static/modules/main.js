/* paulineviroux/RIA/egzamen
 *
 * /static/modules/main.js - Main entry file
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Vue from "vue";

import FastfoodList from "./components/fastfood/list.js";
import FastfoodDetails from "./components/fastfood/details.js";

Vue.use( VueRouter );

let oRouter = new VueRouter( {
    "routes": [
        { "path": "/", "component": FastfoodList },
        { "path": "/:id", "component": FastfoodDetails },
    ],
} );

let oApp = new Vue( {
    "template": `
        <div class="wrapper">
            <h1>Egzamen</h1>
            <main>
                <router-view></router-view>
            <main>
            <p>{{ message }}</p>
            <footer>
                <a href="http://github.com/paulineviroux/egzamen">Lien github</a>
            </footer>
        </div>
    `,
    "router": oRouter,
} );

oApp.$mount( "#app" );