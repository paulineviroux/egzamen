/* paulineviroux/RIA/egzamen
 *
 * /static/modules/components/secret.js - Secret Vue component
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

import Vue from "vue";

Vue.component( "secret", {
    "props": [ "content" ],
    "data": function() {
        return {
            "reveal": {
                "show": "Reveal my secrets!",
                "hide": "Hide my secrets!",
                "value": "Reveal my secrets!",
            },
            "state": false,
        };
    },
    "template": `
        <div>
            <p v-if="state">{{ content }}</p>
            <button v-on:click="revealSecret">{{ reveal.value }}</button>
        </div>
    `,
    "methods": {
        "revealSecret": function() {
            this.state = !this.state;
            this.reveal.value = this.state ? this.reveal.hide : this.reveal.show;
        },
    },
} );