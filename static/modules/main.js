/* paulineviroux/RIA/egzamen
 *
 * /static/modules/main.js - Main entry file
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Vue from "vue";
import VueRouter from "vue-router";
import FastfoodsList from "./components/fastfoods/list.js";
import FastfoodsDetails from "./components/fastfoods/details.js";

Vue.use( VueRouter );

let oRouter = new VueRouter( {
    "routes": [
        { "path": "/", "component": FastfoodsList },
        { "path": "/:id", "component": FastfoodsDetails },
    ],
} );

let oApp = new Vue( {
    "template": `
        <div class="wrapper">
            <h1 class="wrapper__title">Egzamen</h1>
            <main class="main">
                <router-view></router-view>
            <main>
            <p>{{ message }}</p>
            <footer class="footer">
                <a href="http://github.com/paulineviroux/egzamen">Lien github</a>
            </footer>
        </div>
    `,
    "router": oRouter,
} );

oApp.$mount( "#app" );