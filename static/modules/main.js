/* paulineviroux/RIA/egzamen
 *
 * /static/modules/main.js - Main entry file
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Vue from "vue";

import "./components/cats-list.js";
import "./components/secret.js";


let oApp = new Vue( {
    "template": `
        <div class="box">
            <p>{{ message }}</p>
            <cats-list v-bind:elements="cats"></cats-list>
            <secret v-bind:content="secret"></secret>
        </div>
    `,
    "data": {
        "message": "Hey from Vue!",
        "secret": "I'm not a dog person!",
        "cats": [
            { "name": "Skitty", "age": 6 },
            { "name": "Pixel", "age": 4 },
        ],
    },
} );

oApp.$mount( "#app" );